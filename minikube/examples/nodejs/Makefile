.PHONY: all build run deploy clean

all: build run

create:
	kubectl apply -k deploy

build:
	docker-compose build

run:
	docker-compose up -d

deploy: build
	kubectl rollout restart deployment dice-server -n prod

clean:
	docker-compose down
	kubectl delete -k deploy
