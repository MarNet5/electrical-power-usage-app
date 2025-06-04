import React, { useState } from 'react';
import axios from 'axios';

const PowerForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [agg, setAgg] = useState('sum');
  const [day, setDay] = useState('');
  const [weekStatus, setWeekStatus] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/consumption', {
        params: {
          from,
          to,
          agg,
          day: day || undefined,
          weekStatus: weekStatus || undefined
        }
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div>
      <h2>Explore Active Power Usage</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From Date: </label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label>To Date: </label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div>
          <label>Day of Week: </label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Any</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        </div>
        <div>
          <label>Week Status: </label>
          <select value={weekStatus} onChange={(e) => setWeekStatus(e.target.value)}>
            <option value="">Any</option>
            <option value="Weekday">Weekday</option>
            <option value="Weekend">Weekend</option>
          </select>
        </div>
        <div>
          <label>Aggregation:</label>
          <select value={agg} onChange={(e) => setAgg(e.target.value)}>
            <option value="sum">Sum</option>
            <option value="mean">Mean</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
            <option value="median">Median</option>
          </select>
        </div>
        <button type="submit">Get Result</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result</h3>
          <p>Aggregation: <strong>{result.aggregation}</strong></p>
          <p>Value: <strong>{result.result.toFixed(2)}</strong></p>
          <p>Records Counted: <strong>{result.count}</strong></p>
        </div>
      )}
    </div>
  );
};

export default PowerForm;