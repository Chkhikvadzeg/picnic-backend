import express from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.get('/csv', (_, res) => {
  const results = [];
  fs.createReadStream('WhatsgoodlyData-10.csv')
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



