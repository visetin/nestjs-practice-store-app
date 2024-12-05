setup: env-prepare install

env-prepare:
	cp -n .env.local.example .env

install:
	npm ci

start:
	docker compose up --force-recreate -d
	npm run start:dev