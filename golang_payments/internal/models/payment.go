package models

import (
	"fmt"
	"github.com/google/uuid"
	"time"
)

type TransferHistory struct {
	Id             uuid.UUID `json:"id"`
	AccountFrom    uuid.UUID `json:"accountFrom"`
	AccountTo      uuid.UUID `json:"accountTo"`
	Amount         float64   `json:"amount"`
	TimeOfCreation time.Time `json:"timeOfCreation"`
}

type Transaction struct {
	Id          uuid.UUID `json:"id"`
	AccountFrom uuid.UUID `json:"accountFrom"`
	AccountTo   uuid.UUID `json:"accountTo"`
	ItemPrice   float64   `json:"itemPrice"`
	ItemUUID    uuid.UUID `json:"itemUUID"`
	IsFrozen    bool      `json:"isFrozen"`
	IsAccepted  bool      `json:"isAccepted"`
}

type TransactionHistory struct {
	Id             uuid.UUID `json:"id"`
	TransactionId  uuid.UUID `json:"transactionId"`
	TimeOfCreation time.Time `json:"time_of_creation"`
	// Operation type have two options: ('CT', 'CREATED'), ('CD', 'COMPLETED')
	OperationType string `json:"operationType"`
}

func (t *TransferHistory) String() string {
	return fmt.Sprintf(
		`Account from: %s
				Account to: %s
				Time of creation: %s`,
		t.AccountFrom.String(),
		t.AccountTo.String(),
		t.TimeOfCreation.String(),
	)
}

func (t *Transaction) String() string {
	return fmt.Sprintf(
		`Account from: %s
				Account to: %s
				Item_UUID: %s`,
		t.AccountFrom.String(),
		t.AccountTo.String(),
		t.ItemUUID.String(),
	)
}

func (t *TransactionHistory) String() string {
	return fmt.Sprintf(
		`Transaction_ID: %s
				Time of creation: %s`,
		t.TransactionId.String(),
		t.TimeOfCreation.String(),
	)
}
