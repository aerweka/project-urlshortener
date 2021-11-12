const { Url } = require('./db_config')
const { nanoid } = require("nanoid");
const dns = require('dns')
const  valid_url = require('valid-url')

const createShortUrl = async (req, res, next) => {
  const original_url = req.body.url
  const hostname = await original_url.replace(/https?:\/\//, "");

  dns.lookup(hostname, async (err,add,fam) => {
    // If the URL does not exist, return expected error
    if (err) return res.json({ "error": "Invalid Url" });
 
    // Save to database, otherwise.
    try {
      let url = await Url.findOne({
        original_url
      })

      // url exist and return the respose
      if (url) {
        res.json({
          original_url: url.original_url,
          short_url: url.short_url
        })
      } else {
        const short_url = nanoid(5)

        // invoking the Url model and saving to the DB
        url = new Url({
          original_url,
          short_url
        })

        await url.save()
        res.json(url)
      }
    }
    // exception handler
    catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Server Error'
      })
    }
  })
}

const getOriginalUrl = async (req, res, next) => {
  const short_url = req.params.short_url

  try {
    let url = await Url.findOne({
      short_url
    })

    if (url) {
      res.redirect(url.original_url)
    }
  } catch (error) {
    return res.status(400).json({
      error: 'No short URL found for the given input'
    })
  }
}

module.exports = {
  createShortUrl,
  getOriginalUrl
}