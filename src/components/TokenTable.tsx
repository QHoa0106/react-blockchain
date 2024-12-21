import React, { useEffect, useState } from "react";
import {
  fetchMostActivelyTraded,
  fetchTopGainers,
  fetchTopLosers,
} from "../services/dataService";

const TokenTable: React.FC = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [topGainers, setTopGainers] = useState<any[]>([]);
  const [topLosers, setTopLosers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mostActivelyTradedData = await fetchMostActivelyTraded();
        setTokens(mostActivelyTradedData);

        const topGainersData = await fetchTopGainers();
        setTopGainers(topGainersData);

        const topLosersData = await fetchTopLosers();
        setTopLosers(topLosersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const allTokens = [...tokens, ...topGainers, ...topLosers];
  const getValue = (token: any, field: string) => {
    return token[field] ? token[field] : "N/A";
  };
  const getPriceChangeColor = (priceChange: any) => {
    const priceChangeNumber = parseFloat(priceChange);
    if (isNaN(priceChangeNumber)) return "text-gray-500";

    if (priceChangeNumber > 0) return "text-green-500";
    if (priceChangeNumber < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Top Tokens</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Price Change</th>
            <th>Volume 24H</th>
            <th>TVL</th>
          </tr>
        </thead>
        <tbody>
          {allTokens.map((token, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td>{index + 1}</td>
              <td>{getValue(token, "name")}</td>
              <td>{getValue(token, "price")}</td>
              <td className={getPriceChangeColor(token.price_change)}>
                {getValue(token, "price_change")}%
              </td>{" "}
              <td>{getValue(token, "volume_24h")}</td>
              <td>{getValue(token, "TVL")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
