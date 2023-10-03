var express = require('express');
var router = express.Router();


const films = [
{
  id : 1,
  title : "the greatest showman",
  duration : 170,
  budget : 140,
  link : "https://web.french-stream.bio/films/14879-the-greatest-showman-film-streaming-complet-vf.html",
},

{
  id : 2,
  title : "batman the dark knight",
  duration : 250,
  budget : 150,
  link : "https://web.french-stream.bio/films/15405-the-dark-knight-rises-film-streaming-complet-vf.html",
},

{
  id : 3,
  title : "will hunting",
  duration : 140,
  budget : 100,
  link : "https://web.french-stream.bio/films/13957-will-hunting-film-streaming-complet-vf.html",
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

  if(info <= 0) return res.sendStatus(400);

  let orderFilms;
  if(info){
  orderFilms = [...films].filter(film => film.duration > info);
  }
  console.log("GET/ films");
  res.json(orderFilms ?? films);
});

router.post('/', (req,res, next) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);


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

  const findTitle = films.find((film) => film.title === title)

  if(findTitle) return res.sendStatus(409).send("ce film existe deja");


  films.push(newfilm);
  res.json(newfilm);

});


router.delete('/:id', (req, res)  => {

  const foundIndex = films.findIndex((film) => film.id == req.params.id);

  if(foundIndex < 0 ) return res.sendStatus(404);

  const info = films.splice(foundIndex, 1);
  const info2 = info[0];

  res.json(info2);
});

router.patch('/:id', (req,res) => {
  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if ((!title && !duration && !budget && !link) || title?.length === 0 || duration?.length === 0 || budget?.length === 0 || link?.length === 0 ) return res.sendStatus(400);

  const foundFilm = films.findIndex(film => film.id == req.params.id);

  if(foundFilm < 0) return res.sendStatus(404);

  const updateFilms = {...films[foundFilm], ...req.body};

  films[foundFilm] = updateFilms;

  res.json(updateFilms);
});

router.put('/:id',(req, res) => {

  const id = req.params.id;
  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link; 

  if(!title || !duration || !budget || !link) return res.sendStatus(400);

  if(id > films.length){

const newFilm = {
  id : id,
  title : title,
  duration : duration,
  budget: budget,
  link: link,

};

const result = films.find(e => e.title === newFilm.title);

if(result){

  return res.sendStatus(400);
  
}

  films.push(newFilm);
  return res.json(newFilm);

  }

  const findIndex = films.findIndex(e => e.id == req.params.id);

  if(findIndex < 0) return res.sendStatus(404);

  const updateFilm = {...films[findIndex], ...req.body};

  films[findIndex] = updateFilm;

  res.json(updateFilm);

});

module.exports = router;