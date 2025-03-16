export const fetchStockData = async (symbol = "AAPL") => {
  const API_KEY = "68a26f353ac64287a822ff1de4d5873b"; // Replace with your Twelve Data API key
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=5min&apikey=${API_KEY}&outputsize=30&format=JSON`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Twelve Data API Response:", data); // Debugging

    if (data.values) {
      return data.values
        .map(entry => ({
          date: new Date(entry.datetime),
          price: parseFloat(entry.close),
        }))
        .reverse(); // Reverse to show oldest first
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
};
