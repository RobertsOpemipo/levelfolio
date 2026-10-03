package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/levelfolio/backend/internal/config"
	"github.com/levelfolio/backend/internal/middleware"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to initialize config: %v", err)
	}

	r := chi.NewRouter()

	r.Use(chimiddleware.RequestID)
	r.Use(chimiddleware.RealIP)
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://*.levelfolio.app"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-Tenant-Slug", "X-Tenant-ID"},
		AllowCredentials: true,
	}))

	r.Use(middleware.ResolveTenant)

	r.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"archive_operational"}`))
	})

	serverAddr := fmt.Sprintf(":%d", cfg.Port)
	log.Printf("The Archive backend operational at %s (env: %s)", serverAddr, cfg.Environment)
	if err := http.ListenAndServe(serverAddr, r); err != nil {
		log.Fatalf("HTTP server shutdown: %v", err)
	}
}