const dateTimeNow = new Date();

function addDateTime(message){
    const date1 = dateTimeNow.toLocaleDateString();
    const date2 = dateTimeNow.toLocaleTimeString();
    return message = `${date1} ${date2} ${message}`;
}

alert(addDateTime("This is the best moment to have a look at this website !"));


console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15