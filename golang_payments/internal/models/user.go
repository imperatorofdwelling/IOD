package models

import (
	"fmt"
	"github.com/google/uuid"
	"time"
)

type User struct {
	Id      uuid.UUID `json:"id"`
	Balance float64   `json:"balance"`
}

type BalanceChange struct {
	Id             uuid.UUID `json:"id"`
	AccountId      uuid.UUID `json:"accountId"`
	Amount         float64   `json:"amount"`
	TimeOfCreation time.Time `json:"timeOfCreation"`
	IsAccepted     bool      `json:"isAccepted"`
	// Operation type have two options: ('WD', 'WITHDRAW'), ('DT', 'DEPOSIT')
	OperationType string `json:"operationType"`
}

func NewUser() *User {
	return &User{
		Id:      uuid.New(),
		Balance: 0,
	}
}

func (u *User) String() string {
	return fmt.Sprintf(
		`Id: %s
				Balance: %.2f`,
		u.Id,
		u.Balance,
	)
}
