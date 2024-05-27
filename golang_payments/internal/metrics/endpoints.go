package metrics

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	myJson "github.com/https-whoyan/dwellingPayload/pkg/json"
	"io"
	"log/slog"
	"net/http"
	"os"
)

const (
	API_PROTOCOL = "https"
	API_VERSION  = 3
	API_ENDPOINT = "api.yookassa.ru"
)

const (
	PAYMENTS_ENDPOINT = "payments"
	PAYOUTS_ENDPOINT  = "payouts"
)

var (
	PAYMENTS_API = fmt.Sprintf("%v://%v/v%v/", API_PROTOCOL, API_ENDPOINT, API_VERSION)
)

var (
	// Test store ID
	storeID, secretKey string
)

func Init() {
	storeID = os.Getenv("STORE_ID")
	secretKey = os.Getenv("SECRET_KEY")
}

// Request from frontend

type Create struct {
	UserId string `json:"user_id"`
	Amount Amount `json:"amount"`
}

// request to YoooKassa API

type CreatePaymentRequest struct {
	Amount       Amount       `json:"amount"`
	Confirmation Confirmation `json:"confirmation"`
	Capture      bool         `json:"capture"`
	Description  string       `json:"description"`
}

// Response to frontend

type PaymentResponse struct {
	ID           string               `json:"id"`
	Status       string               `json:"status"`
	Paid         bool                 `json:"paid"`
	Amount       Amount               `json:"amount"`
	Confirmation ConfirmationResponse `json:"confirmation"`
	CreatedAt    string               `json:"created_at"`
	Description  string               `json:"description"`
	Metadata     interface{}          `json:"metadata"`
	Recipient    Recipient            `json:"recipient"`
	Refundable   bool                 `json:"refundable"`
	Test         bool                 `json:"test"`
}

// Payment amount

type Amount struct {
	Value    string `json:"value"`
	Currency string `json:"currency"`
}

type Confirmation struct {
	Type string `json:"type"`
}

type Recipient struct {
	AccountID string `json:"account_id"`
	GatewayID string `json:"gateway_id"`
}

type ConfirmationResponse struct {
	Type              string `json:"type"`
	ConfirmationToken string `json:"confirmation_token"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func NewErrorResponse(message string) *ErrorResponse {
	return &ErrorResponse{
		Error: message,
	}
}

func Payment(log *slog.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		const fn = "endpoints.Payment"

		log = log.With(slog.String("fn", fn))
		log.Debug("payment endpoint called")

		req := new(Create)

		if err := myJson.Read(r, req); err != nil {
			log.Error("failed to read request", slog.String("error", err.Error()))
			myJson.Write(w, http.StatusBadRequest, NewErrorResponse("bad request"))
			return
		}

		createReq := createPaymentBody(req)

		resp, err := sendRequest(createReq)
		if err != nil {
			log.Error(
				"failed to send request to YooKassa API",
				slog.String("error", err.Error()),
			)
			myJson.Write(w, http.StatusInternalServerError, NewErrorResponse("server error"))
			return
		}

		log.Debug("request to API sent")

		defer resp.Body.Close()

		// Read response
		respBody, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Error(
				"failed to read response",
				slog.String("error", err.Error()),
			)
			myJson.Write(w, http.StatusInternalServerError, NewErrorResponse("server error"))
			return
		}

		paymentResp := new(PaymentResponse)

		// Create JSON Response
		if err := json.Unmarshal(respBody, paymentResp); err != nil {
			log.Error(
				"failed to make json from response",
				slog.String("error", err.Error()),
			)
			myJson.Write(w, http.StatusInternalServerError, NewErrorResponse("server error"))
			return
		}

		// Send response to Frontend
		myJson.Write(w, http.StatusOK, paymentResp)

		log.Info("response to frontend successfully sent")

	}
}

func createPaymentBody(create *Create) *CreatePaymentRequest {
	createReq := &CreatePaymentRequest{
		Amount: create.Amount,
		Confirmation: Confirmation{
			Type: "embedded",
		},
		Capture: true,
		// TODO: num of order
		Description: "Заказ №72",
	}
	return createReq
}

func sendRequest(createReq *CreatePaymentRequest) (*http.Response, error) {
	createReqJson, err := json.Marshal(createReq)
	if err != nil {
		return nil, err
	}
	apiReq, err := http.NewRequest(
		"POST",
		PAYMENTS_API+PAYMENTS_ENDPOINT,
		bytes.NewBuffer(createReqJson),
	)
	if err != nil {
		return nil, err
	}
	idempotenceKey := uuid.New().String()

	apiReq.SetBasicAuth(storeID, secretKey)
	apiReq.Header.Set("Idempotence-Key", idempotenceKey)
	apiReq.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(apiReq)

	if err != nil {
		return nil, err
	}

	return resp, nil
}
