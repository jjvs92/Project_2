var moment = require("moment");

var now = moment(new Date(), "YYYY/MM/DD").format("YYYY/MM/DD");
console.log("Today: ", now);

module.exports = now;
