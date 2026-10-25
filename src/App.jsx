import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import NotFoundPage from "./pages/Not-Found";
import CoinDetailsPage from "./pages/coin-Details";
import { Routes, Route } from "react-router";
import { fetchJSON } from "./api";
// import SortSelector from "./components/SortSelector"; 
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState("");
  const [sortBy,  setSortBy] = useState("market_cap_desc");
  useEffect(() => {
    const controller = new AbortController();
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await fetchJSON(
          `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`,
          controller.signal
        );
        setCoins(data);
      } catch (error) {
        if (error.name !== 'AbortError') setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    fetchCoins();
    return () => controller.abort();
  }, [limit, sortBy]);

 
   return (
  <>
    <Header />
    <Routes>
      <Route
        path="/"
        element={
          <Home
            coins={coins}
            filter={filter}
            setFilter={setFilter}
            limit={limit}
            setLimit={setLimit}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            error={error}
          />
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/coin/:id" element={<CoinDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);
};
 
export default App;