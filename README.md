# sketchlagoon

## Getting started

### Prerequisites

- Node.js v20+ and NPM (comes with Node)
- Database URL and auth token to a [Turso](https://turso.tech) database (free)
- An OpenAI API key (paid, but extremely cheap for this use case)

### Procedure

- Clone the repo and `cd` into it
- Install dependencies with `npm i`
- `cp .env.example .env`, then open the `.env` file and fill it with the required data
- Run `npm run db:push` to create database tables
- Run the dev server with `npm run dev` and visit the website on `http://localhost:3000`

**Note**: there is a small security measure to prevent anyone from accessing the chatbot APIs. To enable them, visit `https://localhost:3000/api/auth?key=AUTH_PASSKEY`, replacing `AUTH_PASSKEY` with the value you put in `.env`. Visiting this URL with the correct passkey will enable the chatbot APIs for 24 hours.
