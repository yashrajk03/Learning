const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db');
const port = 9501;




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
























































app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})