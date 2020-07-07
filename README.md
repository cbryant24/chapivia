# Chapivia

Trivia game that allows players to signup and compete against each other. Scores are reset each month with top 3 winners. Players can submit trivia to challenge other players to Guess There Trivia!

## Front-End

### Components

#### Carousel

reasoning behind why using a carousel. Mainly not good for visibility and clicking 
https://www.justinmind.com/blog/building-better-ux-patterns-3-alternatives-to-rotating-carousels/

`initialCarouselItemPos`:
`transition`:


### Redux

See [Redux Documentation](https://redux.js.org/recipes/configuring-your-store/) to see how redux store is configured for scalability.

#### Storing Data

- Keep your state as normalized as possible, without any nesting.
- Keep every entity in an object stored with an ID as a key, and use IDs to reference it from other entities, or lists. (. Think of the app's state as a database) see [Normalizer Section](#Normalizer)

#### Normalizer

Used for normalizing api calls allowing for normalizing data for consistent data access

## File Path/Importing

### React

Importing in react is done by setting the `NODE_PATH` in the `.env` file to `src` allowing for absoulte path imports of modulues see [SO Post](https://stackoverflow.com/questions/51289998/react-app-vs-node-path-environment-variables)


## Server

## Installation 

Run the command `npm install` from the root directory of the server. This will install `nodemon` if not install globally

### Start Dev

To start the dev enviornment run the command `npm run dev`

### Globals

Set the system global variable `NODE_PATH` to the appropriate dir 


