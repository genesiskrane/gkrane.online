const connect = require("../db").connectToDatabase;

const init = async () => {
    await connect();
    console.log('nana')
};

module.exports = { init };
