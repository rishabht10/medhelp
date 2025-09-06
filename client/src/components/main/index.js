const express=require('express');
const path=require('path');

const app=express();




app.listen(3001, (res,req)=> res.sendFile(path.join(__dirname, 'views', 'medio.html')));