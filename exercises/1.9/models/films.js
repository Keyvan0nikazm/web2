var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/pizzas.json';

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
function readOneFilms (findFilmById){
    const filmsID = parse(jsonDbPath, films);

    const indexofFilmFound = filmsID.findIndex((filmsID) => filmsID.id = findFilmById);

    if(findFilmById <= 0) return undefined;

    return filmsID[indexofFilmFound];
};


/* Read all the films from the films
   GET films?minimum-duration=value : ascending order by duration
*/
function readAllFilms(minimumDuration){

  const filmsInfo = parse(jsonDbPath, films)

  let orderFilms;
  if(minimumDuration){
  if(minimumDuration <= 0) return undefined;
  orderFilms = [...filmsInfo].filter(filmsInfo => filmsInfo.duration > minimumDuration);
  }
  console.log("GET/ films");
  const readAllFilms =  orderFilms ?? filmsInfo;
  return readAllFilms;
};

function createOneFilms(title, duration, budget, link) {
  const indexNew = parse(jsonDbPath, films);

  const newfilm = {
    id : getNextID,
    title : title,
    duration : duration,
    budget : budget,
    link : link,
  };

  const findTitle = films.find((films) => films.title === title)

  if(findTitle) return res.sendStatus(409).send("ce film existe deja");


  indexNew.push(newfilm);

  serialize(jsonDbPath, indexNew);

  return newfilm;

};


function getNextID (){
  const indexNew = parse(jsonDbPath, films);
  const lastItemIndex = indexNew?.length !== 0 ? indexNew.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? indexNew[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;
  return nextId;
}


function deleteOneFilms(id){

  const filmsDelete = parse(jsonDbPath, films);
  const foundIndex = filmsDelete.findIndex((film) => film.id == req.params.id);

  if(foundIndex < 0 ) return res.sendStatus(404);

  const info = filmsDelete.splice(foundIndex, 1);
  const info2 = info[0];

  serialize(jsonDbPath, filmsDelete);

  return info2;
};

function patchfilms(id) {
  const patchfilms = parse(jsonDbPath, films);

  const foundFilm = patchfilms.findIndex(films => films.id == req.params.id);

  if(foundFilm < 0) return res.sendStatus(404);

  const updateFilms = {...patchfilms[foundFilm], ...req.body};

  patchfilms[foundFilm] = updateFilms;

  return updateFilms;
};

function putFilms(id){

  const putFilms = parse(jsonDbPath, films);

  if(id > putFilms.length){

const newFilm = {
  id : id,
  title : title,
  duration : duration,
  budget: budget,
  link: link,

};

const result = putFilms.find(e => e.title === newFilm.title);

if(result){

  return res.sendStatus(400);
  
}

  putFilms.push(newFilm);
  return res.json(newFilm);

  }

  const findIndex = putFilms.findIndex(e => e.id == req.params.id);

  if(findIndex < 0) {

    return res.sendStatus(404);
  }

  const updateFilm = {...putFilms[findIndex], ...req.body};

  putFilms[findIndex] = updateFilm;

  return updateFilm;

};

module.exports = {
    readOneFilms,
    readAllFilms,
    createOneFilms,
    deleteOneFilms,
    patchfilms,
    putFilms,
};