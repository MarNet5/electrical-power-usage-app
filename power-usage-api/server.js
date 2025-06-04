const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const dayjs = require('dayjs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

let records = [];

fs.createReadStream('./data/Steel_industry_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    records.push({
      date: dayjs(row.date),
      activePower: parseFloat(row.Active_Power_kW),
      maxLoad: parseFloat(row.Maximum_Load),
      weekStatus: row.WeekStatus,
      dayOfWeek: row.Day_of_week
    });
  })
  .on('end', () => {
    console.log('CSV data loaded!');
  });

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
