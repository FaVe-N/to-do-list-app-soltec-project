const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const cors = require('cors');

app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use(cors());

const todoItemRoute = require('./routes/allTodoListItems')

mongoose
.connect("mongodb://127.0.0.1:27017/soltec")
.then(() => console.log("Mongodb is connected"))
.catch((error) => {
        console.log(error.message);
      })


  
app.use('/', todoItemRoute)      ;

app.listen(PORT, () => console.log("Server is connected") );