import axios from "axios";
import { useState, useEffect } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Link, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  const [searchSymbol, setSearchSymbol] = useState("");

  const { data, loading, error } = useFetch(
    "https://api.coinstats.app/public/v1/coins?skip=0&limit=100"
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=100"
      );
      setCoins(response.data.coins);
    };
    fetchData().catch(console.error);
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  console.log(coins);

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchCoin.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchSymbol.toLowerCase())
    );
  });

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search cryptocurrencies"
          onChange={(e) => {
            setSearchCoin(e.target.value);
            setSearchSymbol(e.target.value);
          }}
        />
      </div>
      <div className="table__cointainer">
        <table>
          <thead>
            <tr className="sticky__row">
              <th className="exclude">#</th>
              <th className="exclude">Name</th>
              <th className="right">Price</th>
              <th className="right">24 h</th>
              <th className="right">7 d</th>
              <th className="right">Market cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins?.map((coin) => {
              return (
                <tr>
                  <td className="coin__rank sticky exclude">{coin.rank}</td>
                  {/*  <Link
                    to={`/coin/${coin.name.toLowerCase()}`}
                    className="link"+
                  > */}
                  <td className="sticky exclude">
                    <img className="coin__img" src={coin.icon} />
                    <span className="coin__symbol">
                      {coin.name} <span className="grey"> {coin.symbol} </span>
                    </span>
                  </td>
                  {/* </Link> */}
                  <td>
                    <p className="coin__price right">
                      $
                      {coin.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </td>
                  <td>
                    {coin.priceChange1d < 0 ? (
                      <div className="caret__container">
                        <FaCaretDown className="red caret" />
                        <p className="coin__percent red right">
                          {coin.priceChange1d.toFixed(2)}%
                        </p>
                      </div>
                    ) : (
                      <div className="caret__container">
                        <FaCaretUp className="green caret" />
                        <p className="coin__percent green right">
                          {coin.priceChange1d.toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </td>
                  <td>
                    {coin.priceChange1w < 0 ? (
                      <div className="caret__container">
                        <FaCaretDown className="red caret" />
                        <p className="coin__percent red right">
                          {coin.priceChange1w.toFixed(2)}%
                        </p>
                      </div>
                    ) : (
                      <div className="caret__container">
                        <FaCaretUp className="green caret" />
                        <p className="coin__percent green right">
                          {coin.priceChange1w.toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </td>
                  <td>
                    <p className="market__cap right">
                      $
                      {Math.round(
                        (coin.marketCap * 100) / 100
                      ).toLocaleString()}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
