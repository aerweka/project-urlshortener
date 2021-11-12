require('dotenv').config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

// DB config
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const urlshortener = new Schema ({
  original_url: {type: String, required: true},
  short_url: {type: String, required: true},
})

let Url = mongoose.model('Url', urlshortener);

module.exports = {
  Url
}