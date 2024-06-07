# blog-content

This is a blog posting web application built in node.js and express.js where mongodb is used as the database.

## Screen Recording

https://github.com/Suryanshm000/blog-content/assets/65828169/faec891c-3dc8-4d93-a475-ac0a418d122d

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/download to install nodejs

<br>

## Running the Application at localhost

Clone the project into local

```
git clone https://github.com/Suryanshm000/blog-content.git
```

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```
npm install
```

Before running the server create the .env file and add your mongodb database connection string into <i>CONNECTION_STRING</i> variable
```
CONNECTION_STRING=<your mongodb driver connection string>
```

In order to run the application type the following command

```
npm start
```

The Application runs on **localhost:3000**
