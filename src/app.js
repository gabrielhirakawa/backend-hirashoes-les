const express = require('express');
const cors = require('cors');
const routes = require("./routes");
import './database';

const app = express();


app.use(express.json());
app.use(cors());
app.use(routes);

console.log('Running on port 3000')
app.listen(3000);