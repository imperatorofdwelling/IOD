package repository

import (
	"errors"
	"fmt"
	"github.com/google/uuid"
	"github.com/https-whoyan/dwellingPayload/internal/models"
	"strconv"
)

type RefillableCardDBRow struct {
	Id           int64  `json:"id"`
	User_id      int    `json:"user_id"`
	Card_synonym string `json:"card_synonym"`
	Card_mask    string `json:"card_mask"`
}

func (c *RefillableCardDBRow) RefillableCardDBRowToCardRecord() (*models.RefillableCard, error) {
	if c == nil {
		return nil, nil
	}

	userIDStr := strconv.FormatInt(int64(c.User_id), 10)
	userIDUUID, err := uuid.Parse(userIDStr)
	if err != nil {
		return nil, err
	}
	return &models.RefillableCard{
		Owner: &models.User{
			Id:      userIDUUID,
			Balance: 0,
		},
		Synonym:  c.Card_synonym,
		CardMask: c.Card_mask,
	}, err
}

func getInsertQueryOfRefillableCard(card *models.RefillableCard) string {
	ownerID := card.Owner.Id
	var query string
	query = fmt.Sprintf(`
		INSERT INTO users_card (
		    user_id,
			card_synonym,
		    card_mask
		) VALUES (
			'%v',
		    '%v',
		    '%v'
		)`,
		ownerID.String(),
		card.Synonym,
		card.CardMask,
	)
	return query
}

func (db *PostgresDB) InsertNewRefillableCard(card *models.RefillableCard) (*RefillableCardDBRow, error) {
	if db == nil || db.db == nil {
		return nil, errors.New("nil DB")
	}
	if isFullDataOfNewCard := card.IsFullData(); !isFullDataOfNewCard {
		return nil, errors.New("try to insert not full card data")
	}

	query := getInsertQueryOfRefillableCard(card)
	db.Lock()
	defer db.Unlock()
	infoAboutExecute, err := db.db.Exec(query)
	if err != nil {
		return nil, err
	}
	lastID, err := infoAboutExecute.LastInsertId()
	if err != nil {
		return nil, err
	}
	return db.getRefillableCardByRowID(lastID)
}

func (db *PostgresDB) GetRefillableCardByUser(user *models.User) (*RefillableCardDBRow, error) {
	if user == nil {
		return nil, errors.New("try to search refillable card for empty user")
	}
	userID := user.Id
	return db.GetRefillableCardByUserID(userID)
}

func getSelectQueryByUserID(userID uuid.UUID) string {
	stringUserID := userID.String()
	var query string
	query = fmt.Sprintf(`
		SELECT
			id,
			user_id,
			card_synonym,
			card_mask
		FROM users_card
		WHERE user_id = '%v'
	`, stringUserID)
	return query
}

func (db *PostgresDB) GetRefillableCardByUserID(userId uuid.UUID) (*RefillableCardDBRow, error) {
	if db == nil || db.db == nil {
		return nil, errors.New("try to select card by using empty db")
	}
	executedQuery := getSelectQueryByUserID(userId)
	// Lock, defer unlock
	if db.TryLock() {
		db.Lock()
	}
	defer db.Unlock()
	rows, err := db.db.Query(executedQuery)
	if err != nil {
		return nil, err
	}

	// check is empty data
	copyRow := rows
	if !copyRow.Next() {
		return nil, nil
	}
	var row *RefillableCardDBRow
	err = rows.Scan(&row.Id,
		&row.User_id,
		&row.Card_synonym,
		&row.Card_mask)
	if err != nil {
		return nil, err
	}
	return row, err
}

func getSelectQueryByRowID(rowID int64) string {
	stringRowID := strconv.FormatInt(rowID, 10)
	var query string
	query = fmt.Sprintf(`
		SELECT
			id,
			user_id,
			card_synonym,
			card_mask
		FROM users_card
		WHERE id = '%v'
	`, stringRowID)
	return query
}

func (db *PostgresDB) getRefillableCardByRowID(rowId int64) (*RefillableCardDBRow, error) {
	if db == nil || db.db == nil {
		return nil, errors.New("try to select card by using empty db")
	}
	executedQuery := getSelectQueryByRowID(rowId)
	// Lock, defer unlock
	if db.TryLock() {
		db.Lock()
	}
	defer db.Unlock()
	rows, err := db.db.Query(executedQuery)
	if err != nil {
		return nil, err
	}

	var row *RefillableCardDBRow
	err = rows.Scan(&row.Id,
		&row.User_id,
		&row.Card_synonym,
		&row.Card_mask)
	if err != nil {
		return nil, err
	}
	return row, err
}

func getUpdateQuery(card *models.RefillableCard) string {
	var query string
	query = fmt.Sprintf(`
		UPDATE users_card
		SET
			card_synonym = '%v',
			card_mask = '%v'
		WHERE user_id = '%v'
	`, card.Synonym, card.CardMask, card.Owner.Id.String())
	return query
}

func (db *PostgresDB) UpdateRefillableCardInfo(card *models.RefillableCard) (
	*RefillableCardDBRow, error) {
	if db == nil || db.db == nil {
		return nil, errors.New("try to update with nil database")
	}
	if isFullDataOfCard := card.IsFullData(); !isFullDataOfCard {
		return nil, errors.New("try to update card with not full data")
	}
	// Check is containing data
	// If not, return err
	result, err := db.GetRefillableCardByUser(card.Owner)
	if result == nil || err != nil {
		return nil, errors.New("invalid usage of update. Use Insert.")
	}

	// If result is containing,
	//when we update the values of the card, is will be stable.
	// Ok, got it
	rowID := result.Id
	executedQuery := getUpdateQuery(card)
	if db.TryLock() {
		db.Lock()
	}
	defer db.Unlock()
	_, err = db.db.Exec(executedQuery)
	if err != nil {
		return nil, err
	}
	return db.getRefillableCardByRowID(rowID)
}
