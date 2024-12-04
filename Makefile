# local development

setup: env-prepare install

env-prepare:
	cp -n .env.example .env
	cp -n ./database/.env.example ./database/.env
	cp -n ./database-admin/.env.example ./database-admin/.env
	cp -n ./api/.env.example ./api/.env

install:
	cd ./api && npm ci
	docker compose build

start:
	docker compose up --force-recreate --watch