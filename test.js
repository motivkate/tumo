/*
import express from "express";
let app = express();

app.get('/google/:search', (req, res) => {
  res.redirect('http://google.com/search?q=');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



app.get("/", function (req, res) {
    res.send("Hi world");
});

app.get('/test', function (req, res) {
    
});

app.listen(3000, function () {
    console.log("OK");
});
*/
/* import fs from "fs";
fs.writeFileSync('text.txt', 'test1');

let text = fs.readFileSync('text.txt', 'uft8');
console.log(text);
*/
/*
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/data/:name/:surname/:patronym', (req, res) => {
  const { name, surname, patronym } = req.params;
  const data = nПрізвище ${surname}\nІмя ${name}\nПо батькові: ${patronym};

  fs.writeFile('data.txt', data, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else {
      res.send('Success');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
*/


