const ItabusAPI = require('./Itabus.js');

module.exports = ItabusAPI;

pippo = new ItabusAPI()
pippo.search_tickets("Bologna", "Milano", "2023-10-15")
    .then(products => console.log(products.data.getTickets()))