package json

import (
	"encoding/json"
	"net/http"
)

// s param must be pointer to struct

func Read(r *http.Request, s any) error {
	return json.NewDecoder(r.Body).Decode(s)
}

func Write(w http.ResponseWriter, status int, s any) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(s)
}
