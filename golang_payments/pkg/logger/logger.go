package logger

import (
	"errors"
	"github.com/https-whoyan/dwellingPayload/pkg/logger/slogpretty"
	"log"
	"log/slog"
	"os"
)

const (
	EnvLocal = "local"
	EnvProd  = "prod"
)

var unknownEnv = errors.New("unknown environment (should be local or prod)")

func New(env string) *slog.Logger {
	var logger *slog.Logger
	switch env {
	case EnvLocal:
		logger = setupPrettySlog()
	case EnvProd:
		// TODO change writer(example: file)
		logger = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}),
		)
	default:
		log.Fatal(unknownEnv)
	}
	return logger
}

func setupPrettySlog() *slog.Logger {
	opts := slogpretty.PrettyHandlerOptions{
		SlogOpts: &slog.HandlerOptions{
			Level: slog.LevelDebug,
		},
	}

	handler := opts.NewPrettyHandler(os.Stdout)

	return slog.New(handler)
}
