DOCKER_COMPOSE ?= docker compose
COMPOSE_FILE ?= docker-compose.yml
DC = $(DOCKER_COMPOSE) -f $(COMPOSE_FILE)

.PHONY: up down build restart logs ps re

up:
	$(DC) up -d --build

down:
	$(DC) down

build:
	$(DC) build

restart: down up

logs:
	$(DC) logs -f

ps:
	$(DC) ps

re: down up
