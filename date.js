let today = new Date();

let month = today.getMonth();
let date = today.getDate();
let day = today.getDay();

var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthOfYear = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
day = dayOfWeek[day];
month = monthOfYear[month];

let formattedDate = `${day}, ${month} ${date}`;

module.exports = {
    formattedDate,
    dayOfWeek
};