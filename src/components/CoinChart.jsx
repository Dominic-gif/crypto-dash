import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, TimeScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const API_URL = import.meta.env.VITE_COIN_API_URL;
 
 const CoinChart = ({coinId}) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPrices = async () => {
    try {
      const url = `${API_URL}${coinId}/market_chart?vs_currency=usd&days=7`;
      console.log('URL:', url);

      const res = await fetch(url);
      console.log('Status:', res.status);

      const text = await res.text();
      console.log('Body start:', text.slice(0, 200));

      const data = JSON.parse(text);

      const prices = data.prices.map((price) => ({
        x: price[0],
        y: price[1],
      }));
      console.log(prices);
      

      setChartData({
        datasets: [
          {
            label: 'Price (USD)',
            data: prices,
            fill: true,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchPrices();
}, [coinId]);

if (loading || !chartData) {
  return <p>Loading chart...</p>;
}

return ( <div style={{ marginTop: '30px' }}>
        <Line 
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: 'index', intersect: false }
            },
            scales: {
              x: {
                type: 'time',
                time: { unit: 'day' },
                ticks: { autoSkip: true, maxTicksLimit: 7 }
              },
              y: {
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`
                }
              }
            }
          }}
        />
     
    </div> );

}

export default CoinChart;