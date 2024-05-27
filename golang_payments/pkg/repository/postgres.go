package repository

import (
	"errors"
	"fmt"
	"os"
	"sync"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

const (
	usersTable = "users"
)

type PostgresSQLConfig struct {
	DBHost     string `yaml:"db_host"`
	DBPort     string `yaml:"db_port"`
	DBUsername string `yaml:"db_username"`
	DBPassword string `yaml:"db_password"`
	DBName     string `yaml:"db_name"`
	DBSSLMode  string `yaml:"dbssl_mode"`
}

func LoadConfig() (*PostgresSQLConfig, error) {
	host := os.Getenv("POSTGRES_DB_HOST")
	port := os.Getenv("POSTGRES_DB_PORT")
	user := os.Getenv("POSTGRES_DB_USER")
	pass := os.Getenv("POSTGRES_DB_PASS")
	dbName := os.Getenv("POSTGRES_DB_DBName")
	sslMode := os.Getenv("POSTGRES_DB_SSL")

	return &PostgresSQLConfig{
		DBHost:     host,
		DBPort:     port,
		DBUsername: user,
		DBPassword: pass,
		DBName:     dbName,
		DBSSLMode:  sslMode,
	}, nil
}

type PostgresDB struct {
	sync.Mutex
	db *sqlx.DB
}

const (
	Insert = iota + 1
	Select
	Update
	Delete
)

type Query struct {
	Type     int
	StrQuery string
}

var currDB *PostgresDB

// InitPostgresDB initializes a new instance of the Database.
func InitPostgresDB(cfg *PostgresSQLConfig) error {
	// This if ensures that only 1 database instance is initialized.
	if currDB != nil {
		return errors.New("the database is already initialized")
	}
	if cfg == nil {
		return errors.New("config is empty")
	}

	var connectionString string
	connectionString = fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBUsername,
		cfg.DBPassword,
		cfg.DBName,
		cfg.DBSSLMode)
	sqlxDB, err := sqlx.Open("postgres", connectionString)
	if err != nil {
		return err
	}

	if err = sqlxDB.Ping(); err != nil {
		return err
	}

	currDB = &PostgresDB{
		db: sqlxDB,
	}
	return nil
}

func GetDB() (*PostgresDB, bool) {
	if currDB == nil {
		return nil, false
	}
	return currDB, true
}

func Disconnect() error {
	db, isContains := GetDB()
	if !isContains || db.db == nil {
		return errors.New("the database is already initialized")
	}
	db.Lock()
	defer db.Unlock()
	err := db.db.Close()
	return err
}
