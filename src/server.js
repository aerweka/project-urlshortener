require('dotenv').config();
const express = require('express');
const {
  createShortUrl,
  getOriginalUrl
} = require('./handler');
const cors = require('cors');
const app = express();
const { urlencoded } = require('body-parser')


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(urlencoded({extended: false}))

// app.use((req, res, next) => {
//   const render = res.render;
//   const send = res.send;
//   res.render = function renderWrapper(...args) {
//     Error.captureStackTrace(this);
//     return render.apply(this, args);
//   };
//   res.send = function sendWrapper(...args) {
//     try {
//         send.apply(this, args);
//     } catch (err) {
//         console.error(`Error in res.send | ${err.code} | ${err.message} | ${res.stack}`);
//     }
//   };
//   next();
// });

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', createShortUrl)

app.get('/api/shorturl/:short_url', getOriginalUrl)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
