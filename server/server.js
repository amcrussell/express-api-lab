const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');
const path = require('path');

let app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../client')));
app.use('/jquery', express.static( path.join(__dirname, '../node_modules/jquery/dist')));

app.listen(3000);