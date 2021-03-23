const express = require('express');
const mongoose = require('mongoose');

const shortUrl = require('./models/shortUrl');

const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urlShortener', {useNewUrlParser: true,  useUnifiedTopology: true});

app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find()

    res.render('index', {shortUrls: shortUrls})
});

app.post('/shortUrls', async (req, res) => {
    await shortUrl.create({ fullURL: req.body.fullUrl })

    res.redirect('/')
});

app.get('/:shortUrl', async (req, res) => {
    const short = await shortUrl.findOne({ shortURL : req.params.shortUrl })
    if (short == null) return res.sendStatus(404)

    short.click++
    short.save()

    res.redirect(short.fullURL)
  })

const port = process.env.PORT || 1234;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});