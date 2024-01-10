run-dev:
	docker compose -f compose-dev.yaml up -d --build

stop-dev:
	docker compose -f compose-dev.yaml down

run-prod:
	docker compose -f compose-prod.yaml up -d --build

stop-prod:
	docker compose -f compose-prod.yaml down
