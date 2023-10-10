var express = require('express');
const router = express.Router();
const {
  readOneFilms,
  readAllFilms,
  createOneFilms,
  deleteOneFilms,
  patchForfilms,
  putForFilms,
} = require('../models/films');

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
    const findFilmById = readOneFilms(req?.params?.id);

    if(findFilmById < 0) return res.sendStatus(404);

    res.json(findFilmById);
})


/* Read all the films from the films
   GET films?minimum-duration=value : ascending order by duration
*/
router.get('/', function(req,res,next) {
  const minimumDuration = req?.query['minimum-duration']? req.query['minimum-duration']: undefined;

  const allFilmsFilter = readAllFilms(minimumDuration);

  if (allFilmsFilter == undefined) return res.sendStatus(404);
  console.log("GET/ films");
  res.json(allFilmsFilter);
});



router.post('/', (req,res, next) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  if(!title || !duration || !budget || !link) return res.sendStatus(400);

  const PostFilms = createOneFilms(title, duration, budget, link)

  const findTitle = films.find((films) => films.title === title)

  if(findTitle) return res.sendStatus(409).send("ce film existe deja");

  res.json(PostFilms);

});


router.delete('/:id', (req, res)  => {
  const deleteFilms = deleteOneFilms(req?.params?.id);

  // Tu avais gardé le code de ton modèle ici 

  if(deleteFilms == undefined ) return res.sendStatus(404);

  res.json(deleteFilms);
});

router.patch('/:id', (req,res) => {
  const PatchFilms = patchForfilms(req?.params?.id);

  // OK JE VAIS DANS TES MODELES
  
  // const foundFilm = films.findIndex(films => films.id == PatchFilms);

  if(PatchFilms <= 0) return res.sendStatus(404);

  res.json(PatchFilms);
});

router.put('/:id',(req, res) => {

  const putFilms = parse(jsonDbPath, films);

  const PUTfilms = putForFilms(req?.params?.id);

  if(PUTfilms > putFilms.length){

const newFilm = {
  id,
  title,
  duration,
  budget,
  link,

};

const result = putFilms.find(e => e.title === newFilm.title);

if(result){

  return res.sendStatus(400);
  
}

  putFilms.push(newFilm);
  return res.json(newFilm);

  }

  const findIndex = putFilms.findIndex(e => e.id == PUTfilms);

  if(PUTfilms < 0) {

    return res.sendStatus(404);
  }

  const updateFilm = {...putFilms[findIndex], ...req.body};

  putFilms[findIndex] = updateFilm;

  res.json(updateFilm);

});

module.exports = router;