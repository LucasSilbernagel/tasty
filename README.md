# Tasty

A multi-page website of tasty recipes, inspired by [Delish.com](https://www.delish.com/).

## Live Link

[https://symphonious-croquembouche-c45916.netlify.app/](https://symphonious-croquembouche-c45916.netlify.app/)

## Tech Stack

### Content Management System

- [Strapi](https://strapi.io/)
- [Cloudinary](https://cloudinary.com/)

### Front End

- [Gatsby](https://www.gatsbyjs.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Luxon](https://www.npmjs.com/package/luxon)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-markdown](https://www.npmjs.com/package/react-markdown)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [react-tooltip](https://www.npmjs.com/package/react-tooltip)
- [rehype-raw](https://www.npmjs.com/package/rehype-raw)

### Linting & Formatting

- [eslint-config-lucas-silbernagel](https://www.npmjs.com/package/eslint-config-lucas-silbernagel)

## Run Locally

### Prerequisites

In order to run this application locally, you must have node installed on your computer. To check if you already have it installed, enter `node -v` in your terminal. If you do not have node, you can install it here: https://nodejs.org/en/

### Clone the repository

Once you have confirmed that node is installed, `cd` into a folder on your computer and run the following command to clone the repository:

`git clone https://github.com/LucasSilbernagel/tasty.git`

Then `cd` into the root folder and open it in your code editor. For Visual Studio Code:

`cd tasty`
`code .`

### Install dependencies

`cd` into the `gatsby` folder and run `npm install`.

`cd` back out and then into the `strapi` folder and run `npm install`.

### Strapi server environment variables

In the `strapi` folder, create a `.env` file and add the following keys:

```
HOST=
PORT=
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
```

For the values, refer to the [Strapi documentation](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

### Run Strapi CMS locally

In the strapi folder, run `npm run develop`.

Once the project is running, you will need to create an Administrator for the CMS so you can start creating content to populate the frontend. Visit [http://localhost:1337/admin](http://localhost:1337/admin) and follow the instructions.

When you have created an Administrator account, you then need to create an API key so the front end can access the content you create.

#### Create Your API Key

1. When logged in, from the sidebar, go to `Settings -> API Tokens` and click the `Create new API Token` button
1. Add a name, and click `Save`

Now that you have created your API key, you need to include it in the front end.

#### Add Your API Key To The front end

In the `gatsby` folder, create a `.env.development` file and add the following keys:

`STRAPI_API_URL=http://localhost:1337`

`STRAPI_TOKEN= *api key*`

Replace *api key* with the API key created in the admin panel:
`STRAPI_TOKEN=api-key-you-generated`

### Start up the Gatsby front end

To start up the Gatsby front end, make sure you are in the `gatsby` folder and then run `npm start` in your terminal. Once the script finishes running, you should be able to view the app at [http://localhost:8000/](http://localhost:8000/). You will need to restart the Gatsby front end whenever you make content changes in the Strapi admin panel.

## Testing

### Unit Tests

Unit tests are written with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

To run the front-end unit tests, `cd` into the `gatsby` folder.

Use `npm test` to run all unit tests, or use `npm test SomeFileToRun` to run a specific test file.
