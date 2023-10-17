const div = document.querySelectorAll("div");

div.forEach((div) => {
    div.addEventListener('click',() =>{
    div.innerText = div.style.backgroundColor;
    });
});