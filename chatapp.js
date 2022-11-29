const express = require ('express');
let app = express();
const fs = require('fs');
const bodyparser= require('body-parser')

app.use(bodyparser.urlencoded({extended:false}))


app.get('/',(req,res,next)=>{
    fs.readFile('file.txt',(error,data)=>{
        if(error){
            console.log(error)
            data='no chat exist';
        }
        res.send(`${data}<form action="/" method="POST" onSubmit ="document.getElementById('username').value=localStorage.getItem('username')" >    
        <input type= "text" name="message" id = "message">
        <input type= "hidden" name="username" id = "username">
        </br> 
        <button type="submit">send</button></form>`);   
   
         });
 });
    
   
 
app.post('/',(req,res,next)=>{
    fs.appendFile('file.txt',`${req.body.username}:${req.body.message}`,(err)=>{
        console.log(err)
    })

    res.redirect('/')
})

app.get('/login',(req,res,next)=>{
    res.send(`<form action="/" method="POST" onSubmit ="localStorage.setItem('username', document.getElementById('username').value)" >    
    <input type= "text" name="message" id = "username">
    </br> 
    <button type="submit">login</button></form>`);
})


app.listen(5000,()=>{
    console.log("akshay is rinning")
})