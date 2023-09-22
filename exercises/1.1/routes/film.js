var express = require('express');
var router = express.Router();


const Film = [
{
  id : 1,
  title : 'the greatest showman',
  duration : 152,
  budget : 140,
  link : 'https://web.french-stream.bio/films/14879-the-greatest-showman-film-streaming-complet-vf.html',
},

{
  id : 2,
  title : 'batman the dark knight',
  duration : 250,
  budget : 150,
  link : 'https://web.french-stream.bio/films/15405-the-dark-knight-rises-film-streaming-complet-vf.html',
},

{
  id : 3,
  title : 'will hunting',
  duration : 140,
  budget : 100,
  link : 'https://web.french-stream.bio/films/13957-will-hunting-film-streaming-complet-vf.html',
}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(' GET/ film');
  res.json(Film);
});

module.exports = router;