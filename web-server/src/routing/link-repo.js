// const app = require('express')();

const route = (app) => {
    app.get('/link-repo', (reg, res) => {
        res.send(["value1", "value2"])
    });
};

module.exports = { route };