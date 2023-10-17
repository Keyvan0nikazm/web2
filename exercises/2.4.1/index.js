const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");

btn1.addEventListener("mouseover", startime);
btn2.addEventListener("click", stoptime);

let timeOutId;
let time = 5000; // milliseconde
let count = 0;
let dateTime;


function startime(){
    timeOutId = setTimeout(() => {
        alert("Game over, you did not click 10 times within 5s !"); 
    }, time);
    start = new Date();
};

function stoptime(){
    count++;
    if(count == 10){
        clearTimeout(timeOutId);
        const end = new Date();
        const final = end.getTime() - start.getTime();
        alert(`You win ! You clicked 10 times within ${final} ms`);
        };
}