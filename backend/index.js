const express = require('express');
const translateCreds = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const { Translate } = require('@google-cloud/translate');
const readline = require('readline');
const cors = require('cors');
const Sentiment = require('sentiment');
// const Twitter = require('twitter');

const app = express();
app.use(cors());
const port = 3000;
const projectId = translateCreds.project_id;
const translate = new Translate({
  projectId: projectId,
});
// const twitterClient = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });


app.post('/getsentiment', (req, res) => {
  translate.translate(req.query.text, 'en')
    .then(response => {
      const trans = response[0];
      console.log('translation: ', trans);

      const sentiment = new Sentiment();
      const result = sentiment.analyze(trans);
      res.json({
        result,
        translation: trans
      })
    })
    .catch(err => {
      res.status(500);
      res.json({ err });
    });
});

app.listen(port);