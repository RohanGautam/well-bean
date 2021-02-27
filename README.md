# Well bean

We care about everyone's well-bean

## Web

Running the client:
```
cd server
npm run client
```

Running the server:
```
cd server
npm run server
```

Running both:
```
cd server
npm run dev
```

### Server

1. Create a database using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Obtain your Mongo URI using the __Connect__ > __Connect your application__ option
3. Create a `server/keys.js` file with the following code:

```
module.exports = {
    mongoURI: '<INSERT MONGO URI>'
}
```

4. Download necessary libraries using:
```
cd server
npm install
```

### Client

Download necessary libraries using:
```
cd client
npm install
```