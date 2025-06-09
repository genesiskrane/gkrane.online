const connect = require("../db").connectToDatabase;

const init = async () => {
    await connect();
    console.info('Initialized')
};

module.exports = { init };
