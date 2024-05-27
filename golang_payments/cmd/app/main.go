package main

import (
	"github.com/https-whoyan/dwellingPayload/config"
	"github.com/https-whoyan/dwellingPayload/pkg/logger"
)

func main() {
	cfg := config.LoadConfig()
	log := logger.New(logger.EnvLocal)
	cfg.Run(log)
}
