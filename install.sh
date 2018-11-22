cp ./.env.example ./.env

echo DB_CONNECTION_STRING=${DB_CONNECTION_STRING} >> .env

echo APP_KEY=${APP_KEY} >> .env

npm install

if npm test; then

    docker-compose stop

    docker-compose build

    docker-compose up -d

    docker-compose start
else
    printf 'test error\n'
fi