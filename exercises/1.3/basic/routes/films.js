var express = require('express');
var router = express.Router();


const films = [
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

// Read the film identified by an id in the films
router.get('/:id', function(req, res) {
    console.log(`GET /film / ${req.params.id}`);

    const indexofFilmFound = films.findIndex((film) => film.id = req.params.id);

    if(indexofFilmFound < 0) return res.sendStatus(404);

    res.json(films[indexofFilmFound]);
})


/* Read all the films from the films
   GET films?minimum-duration=value : ascending order by duration
*/
router.get('/', function(req,res,next) {
  const info = req?.query['minimum-duration']? req.query['minimum-duration']: undefined;
  let orderFilms;
  if(info)
  orderFilms = [...films].filter(film => film.duration > info);
  console.log("GET/ films");
  res.json(orderFilms ?? films);
});

router.post('/', (req,res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.status(400);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newfilm = {
    id : nextId,
    title : title,
    duration : duration,
    budget : budget,
    link : link,
  };

  films.push(newfilm);

  res.json(newfilm);

})

module.exports = router;