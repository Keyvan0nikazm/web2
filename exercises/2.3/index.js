const formulaire = document.querySelector("form");
const text = document.querySelector("#text");
const divmessage = document.querySelector("#message");

formulaire.addEventListener("submit", (e) => {

    e.preventDefault();
    formulaire.remove();
    divmessage.textContent = text.value;
});