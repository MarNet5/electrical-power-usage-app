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
app.get('/api/consumption', (req, res) => {
  const { from, to, day, weekStatus, agg = 'sum' } = req.query;

  let filtered = [...records];

  if (from) {
    const fromDate = dayjs(from);
    filtered = filtered.filter(r => r.date.isAfter(fromDate.subtract(1, 'day')));
  }

  if (to) {
    const toDate = dayjs(to);
    filtered = filtered.filter(r => r.date.isBefore(toDate.add(1, 'day')));
  }

  if (day) {
    filtered = filtered.filter(r => r.dayOfWeek.toLowerCase() === day.toLowerCase());
  }

  if (weekStatus) {
    filtered = filtered.filter(r => r.weekStatus.toLowerCase() === weekStatus.toLowerCase());
  }

  const values = filtered.map(r => r.activePower).filter(v => !isNaN(v));

  let result;
  switch (agg) {
    case 'mean':
      result = values.reduce((a, b) => a + b, 0) / values.length;
      break;
    case 'min':
      result = Math.min(...values);
      break;
    case 'max':
      result = Math.max(...values);
      break;
    case 'median':
      values.sort((a, b) => a - b);
      const mid = Math.floor(values.length / 2);
      result = values.length % 2 === 0
        ? (values[mid - 1] + values[mid]) / 2
        : values[mid];
      break;
    case 'sum':
    default:
      result = values.reduce((a, b) => a + b, 0);
  }


  res.json({
    count: values.length,
    aggregation: agg,
    result: result || 0
  });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
