Stock Market Price Chart
📌 Project Description
This project is an interactive stock market price chart built using D3.js and React. It fetches real-time stock market data using the Twelve Data API and visualizes stock price trends using a variable color line chart. The chart updates dynamically as new data arrives.

📊 Chosen Chart Type
Line Chart with Variable Colors (inspired by ObservableHQ's Variable Color Line)
Colors indicate stock price changes over time.
✅ Implemented Features
1️⃣ Real-Time Stock Data Fetching
Uses Twelve Data API to fetch live stock market prices.
Updates the chart dynamically with new stock data.
2️⃣ Interactive Features
✔ Tooltip on Hover – Displays price and time when hovering over a data point.
✔ Legends – Shows color-coded price categories.
✔ Dynamic Data Updates – The chart updates automatically as new data is fetched.
✔ Axis Transitions – Smooth transitions when new data changes the scale.

3️⃣ Responsive & Adaptive Design
✔ Prevents tooltip cutoff on small screens.
✔ Adjusts dynamically for different screen sizes.

🚀 How to Run the Project Locally
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/stock-market-chart.git
cd stock-market-chart
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Set Up Twelve Data API Key
Sign up at Twelve Data and get a free API key.
Create a .env file in the project root and add:
plaintext
Copy
Edit
REACT_APP_TWELVE_DATA_API_KEY=your_api_key_here
4️⃣ Start the Project
bash
Copy
Edit
npm start
The app will launch at http://localhost:3000/
📌 Additional Notes
The app uses D3.js for SVG-based chart rendering.
The chart automatically updates every X seconds (adjustable in the code).
You can modify the stock symbol in fetchStockData.js.
🎯 Future Improvements (Bonus Ideas)
🚀 Animations & Transitions – Improve smoothness when new data updates.
🚀 Dark Mode Support – Customizable themes.
🚀 Multi-Stock Comparison – Visualizing multiple stocks in the same chart.

🔗 Links
Live Demo (if hosted): [Demo Link Here]
GitHub Repository: [GitHub Link Here]
