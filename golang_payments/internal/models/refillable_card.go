package models

// (Yan) TODO payment card struct

type RefillableCard struct {
	Owner    *User  `json:"owner"`
	Synonym  string `json:"synonymic"`
	CardMask string `json:"cardMask"`
}

func NewRefillableCard(owher *User, synonym, cardMask string) *RefillableCard {
	return &RefillableCard{
		Owner:    owher,
		Synonym:  synonym,
		CardMask: cardMask,
	}
}

func (card *RefillableCard) IsFullData() bool {
	if card == nil {
		return false
	}
	if card.Owner == nil || len(card.Synonym) == 0 || len(card.CardMask) == 0 {
		return false
	}
	return true
}
