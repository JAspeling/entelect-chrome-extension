const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

const app = express();
const port = process.env.PORT || 8000;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(timeout('10s'));
// app.use(haltOnTimedout)

// function haltOnTimedout(req, res, next) {
//     if (!req.timedout) next()
// }

// require('./routing/link-repo').route(app);

app.get('/link-repo', (reg, res) => {
    res.send(["value1", "value2"])
});

// app.post('/link-repo', (req, res) => {
//     const linkQuery = req.query.link
//     if (!linkQuery) {
//         return res.send({
//             error: 'Invalid url! Link not provided'
//         });
//     }


//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
