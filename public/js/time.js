var moment = require("moment");

var now = moment(new Date(), "YYYY/MM/DD").format("YYYY/MM/DD");

module.exports = now;
