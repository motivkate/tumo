import express from 'express';
import { appendFileSync } from 'fs'
const app = express();
//на сервер йде запит шлях і метод host
app.use(express.static('./'));  //аргумент - де експрес може знайти через шлях(слеш) в папку в якій лежить файл
app.use(express.json());

app.post('/stats', (req, res) => { //request, response
  //  res.send('Hello');
appendFileSync('statistics.txt', JSON.stringify(req.body) + '\n');
  //  console.log(req.body);
});

app.listen(3000, () => {
    console.log('ok');
});