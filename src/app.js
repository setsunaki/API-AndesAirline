const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); //form-url-encode

app.get('/', (req,res) => {
    res.send('API Check-in Andes Airlines');
});