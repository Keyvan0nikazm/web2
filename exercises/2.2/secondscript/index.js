const body = document.querySelector("body");
const divmessage = document.querySelector("#message");
const divcompteur = document.querySelector("#counter");
window.addEventListener("click",inc);
var message = " ";

function inc(){
    var number = divcompteur.innerHTML;

    number++;

    if(number >= 5 && number <= 9){
        message = "Bravo, bel échauffement !"
    }

    if(number >= 10){
        message = "Vous êtes passé maître en l'art du clic !"
    }

    if(number === 1001){
        message = "le destin ne m aime pas ";
    }

    divmessage.textContent = message;
    divcompteur.textContent = number;
}