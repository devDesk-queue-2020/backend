# DevDesk Backend by Lambda EU4 Team

This Backend was created for the Node Build Week Project of Emma Andrews & Niklas Becker called DevDesk.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Open the project folder
```
npm install
```
```
npm run server
```
The port will be 5000, you can change it in the .env file.

## Endpoints

there are in total 21 different Endpoints sorted in 4 Categories.

Users:
```
/api/users
```
Ticket:
```
/api/tickets
```
Comments:
```
/api/comments
```
Users:
```
/api/category
```

To see every single endpoint, please check the Postman Docs here:

* [DOCS](https://documenter.getpostman.com/view/10271984/SWTEcwFi?version=latest#intro) - created with Postman

## Running the tests

There are tests available for each endpoint, each model, and every single middleware.

Install the Dev-Dependencies with 
```
npm i -D
```
run the command: 
```
npm run tests
```

### Data-Structure

ADD SCREENSHOT HERE

## Deployment

We recommend deploying this backend on Heroku with Postgres. A matching JWT-Secret & the following DB_ENV variable needs to be decleared in Herokus config vars.

```
DB_ENV          production
JWT_SECRET      exampleSecret
```


## Built With

* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [JSW](https://jwt.io/) - for auth, in combination with:
* [BCRYPTJS](https://www.npmjs.com/package/bcrypt) - for hashing passwords
* [SQL](https://www.sqlite.org/) - for storing data
* [JEST](https://jestjs.io/) - for testing


## Contributing

We will not take any contributions since this is a discontinued one time project for Lambda School. If you would like to work with this backend, feel free to clone it. If you have questions contact:

* [Emma Andrews](https://github.com/ELAndrews)
* [Niklas Becker](https://github.com/niklasbec)

## Authors

* **Emma Andrews** - **Niklas Becker** - Team Lead: **Chinedu Orie**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


