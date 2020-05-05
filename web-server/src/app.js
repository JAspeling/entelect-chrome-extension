const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

require('./routing/link-repo').route(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
