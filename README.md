# Well bean

We care about everyone's well-bean

## Server

### Setup

1. Create a database using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Obtain your Mongo URI using the __Connect__ > __Connect your application__ option
3. Create a `server/keys.js` file with the following code:

```
module.exports = {
    mongoURI: '<INSERT MONGO URI>'
}
```

4. Download necessary libraries using `npm install`

### Running the server

`npm run server`
