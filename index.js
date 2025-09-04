const express = require ('express');
const app = express();
// middle ware to parse json body 
app.use(express.json());
const port = 3000;

 const data =[
    {id:1,name:"John",age:25},
    {id:2,name:"Jane",age:30},
    {id:3,name:"Doe",age:22}

 ];
app.get('/', (req, res) => {
    res.send("Welcome to my API! Use /data to see the data.");
});

 // GET request to fetch all data 
 app.get('/data',(req,res)=>{
    res.json(data);
 })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})