# electrical-power-usage-app


This project contains two parts:

Backend API built with Node.js + Express serving electrical power consumption data

Frontend React app for exploring the data with filters and aggregations

---

# Power Usage API (Node.js Backend)
Backend Setup (power-usage-api)

Prerequisites:
Node.js installed (v18+ recommended)

Steps
1. Navigate to backend folder: cd power-usage-api

2. Install dependencies: npm install
3. Start the server: node server.js
4. The server will run at: http://localhost:5000

Backend API
Endpoint
GET /api/consumption

Supports query parameters:

Parameter	Description	Example
from	Start date (inclusive), format YYYY-MM-DD	2018-03-01
to	End date (inclusive), format YYYY-MM-DD	2018-05-01
day	Day of week (Monday, Tuesday, etc.)	Monday
weekStatus	Weekday or Weekend	Weekend
agg	Aggregation: sum, mean, min, max, median	mean

Example: http://localhost:5000/api/consumption?from=2018-03-01&to=2018-05-01&agg=mean
# Power Usage UI (React Frontend)

Frontend Setup (power-usage-ui)
Prerequisites
Node.js installed (v18+ recommended)

Steps
1. Navigate to frontend folder: cd power-usage-ui
2. Install dependencies: npm install
3. Start the React development server: npm start
4. The frontend app will be served at: http://localhost:3000

Frontend Notes
The frontend expects the backend API running at http://localhost:5000/api/consumption.

Use the UI to select date ranges, filter by day or weekend/weekday, choose aggregation, and view results.




