// const app = require('express')();

const route = (app) => {
    app.get('/link-repo', (reg, res) => {
        res.send(["value1", "value2"])
    });

    app.post('/link-repo', (req, res) => {
        const linkQuery = req.query.link
        if (!linkQuery) {
            return res.send({
                error: 'Invalid url! Link not provided'
            });
        }


        console.log('Got body:', req.body);
        res.sendStatus(200);
    });

};

module.exports = { route };