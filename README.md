# Well bean

We care about everyone's well-bean

## Our pitch video

[![Pitch](https://img.youtube.com/vi/Pvnv2umzIcg/0.jpg)](https://www.youtube.com/watch?v=Pvnv2umzIcg)

## Screenshots

<table>
  <tr>
    <td> <img src="readme-imgs/chatbot.png"  alt="1"  ></td>
    <td><img src="readme-imgs/check in.png" alt="2"></td>
   </tr> 
   <tr>
    <td> <img src="readme-imgs/stats.png"  alt="1"  ></td>
    <td><img src="readme-imgs/garden2.png" alt="2" ></td>
  </tr>
</table>
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
2. Obtain your Mongo URI using the **Connect** > **Connect your application** option
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

1. Download necessary libraries using:

```
cd client
npm install
```

2. Make a `/client/env` file of the format:

```
REACT_APP_GARDEN_URL=<INSERT AR URL>
```

## Credits

1. [Emotion recognition model](https://github.com/vjgpt/Face-and-Emotion-Recognition)
