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

## Ideas and improvements

### Roba da fare per la tesi:

- [ no ] Merge the drawings and chat screens?
- [ si ] Remove the first two screens / merge them into one?
  - e.g. Add some sort of menu screen with some information about the Mar Menor and a button to go to the drawings screen (w/ AI integrated into it)
    - Maybe display some of the graphics of the drawings screen right in the menu screen (e.g. the background and some small drawings)

**Transition to a digital twin**\
Use real-time data from SMLG to turn the app into a frontend of the dt
- In the drawings screen, change colors based on the time of day at the Mar Menor
  - If the first two screens are replaced with a menu screen, change colors there too
- Also consider adding other elements based on data, such as clouds, rain, water temperature indicators, etc.
- Provide tools to the AI model so it can access dt data during conversations (i.e. it can reliably reply to questions such as "How is the weather there?")
- Integrate forecasting and simulations somehow?

**Further personification**
- [ no ] In addition to talking to the lagoon, add the option to talk to elements in the drawings screen
- [ no ] Fix grainy images
- [ si ] Animate text
- [ si ] Make the website responsive!
- [ si ] Add an attractive "menu" screen with drawings floating around and a start button?
- [ no ] Actual full screen using browser APIs

**Eu and lagoon screens**
- [ no ] Highlight some lagoons in the EU map
- [ si ] Show some pictures in the EU and lagoon map
- [ forse ] Maybe split text into bullet points, move between them with keyboard/button and toggle relevant images
- [ no ] Replace map images with an actual map
- [ forse ] Highlight or write something on the Mar Menor in its map

**Drawings screen**
- [ no ] Add a more meaningful progress visualization in the drawings screen. Maybe a progress bar and some cool animations when a drawing gets opened for the first time. Also we could make opened drawings smaller instead of reducing their opacity.
- [ si ] Replace the css-based grid with a collision-based canvas to avoid overlapping elements at any resolution

**Chat screen**
- [ si ] Redesign the chat screen
- [ si ] Show an avatar of the Mar Menor
- [ no ] Use a layout that's more similar to ChatGPT
- [ no ] Show images related to the conversation
