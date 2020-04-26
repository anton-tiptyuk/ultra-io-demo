## Running in docker
To initialize postgres and web server containers please run:

```bash
docker-compose build
docker-compose up -d
```

The `ultra-io-demo` container is intended to map its web server port to localhost's 3000 port.
Please update `docker-compose.yml` to bind it to a different port.

To fill the database with sample seeded data please run:
```bash
docker-compose exec ultra-io-demo npm run db:seed
```
If you run seeding once again it cleans up existing data and seeds new random set, you are welcome to do it several times if you like.

## Running locally
You are still welcome to install the solution locally by simply running `npm i`.
Also, you'll need `typescript` and probably `ts-node`.
It still requires postgres server available, the database configuration can be found in `.env`.
To launch the web-server please run : `nest start`.

## Swagger
The swagger is available in web server. If you start containers with default settings it is supposed to be located at http://localhost:3000/api/

## Tests
I focused on providing maximal coverage for services and controllers I wrote. Most of tests available are unit tests which just make sure that tested object calls what it is expected to call from its dependencies. However, I've also added some specific tests covering features implemented inside `@nestjsx/crud` library like request validation.

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

Or you can try running that tests in docker container with, say:
```bash
docker-compose exec ultra-io-demo npm run test:cov
```

## Fetching manufacturer
I was not sure i understood the task right. There are 2 ways to fetch only manufacturer details for a specified car.
- [get /car/:carId/manufacturer] - returns only manufacturer data for provided carId
- get one CRUD action [get /car/:carId] - has builtin `fields` parameter (in fact GetMany has similar fields behavior). You can specify carId and add 'fields' parameter saying `manufacturer`. This way you will get car object with carId and only containing manufacturer details. In fact if you haven't written that 'select only manufacturer' condition i would use this way for this purpose cause it is available out-of-box and overhead is minimal.
