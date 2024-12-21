import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TokenTable from "../components/TokenTable";
import {
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";

interface ChartData {
  date: string;
  TVL?: number;
  Volume?: number;
}

const Dashboard: React.FC = () => {
  const [chartDataTVL, setChartDataTVL] = useState<ChartData[] | null>(null);
  const [chartDataVolume, setChartDataVolume] = useState<ChartData[] | null>(
    null
  );

  useEffect(() => {
    // Lấy dữ liệu biểu đồ từ CoinGecko API
    const fetchData = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
      );
      const data = res.data;

      const chartLabels = data.prices.map((price: [number, number]) => {
        const date = new Date(price[0]);
        return `${date.getHours()}:${date.getMinutes()}`;
      });

      const tvlValues = data.prices.map((price: [number, number]) => price[1]);
      const volumeValues = data.total_volumes.map(
        (volume: [number, number]) => volume[1]
      );

      setChartDataTVL(
        tvlValues.map((value: number, index: number) => ({
          date: chartLabels[index],
          TVL: value,
        }))
      );

      setChartDataVolume(
        volumeValues.map((value: number, index: number) => ({
          date: chartLabels[index],
          Volume: value,
        }))
      );
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      {/* Main Dashboard Layout */}
      <div className="p-6 max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* TVL Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">TVL</h2>
            <p className="text-lg font-semibold">$5.32B</p>
            <p className="mb-4 text-gray-400">Total Value Locked</p>
            {chartDataTVL ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartDataTVL}>
                  <defs>
                    <linearGradient id="colorTVL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF0099" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF0099" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: "#fff" }} />
                  <YAxis tick={{ fill: "#fff" }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="TVL"
                    stroke="#FF0099"
                    fillOpacity={1}
                    fill="url(#colorTVL)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p>Loading chart...</p>
            )}
          </div>

          {/* Volume 24H Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Volume 24H</h2>
            <p className="text-lg font-semibold">$860.60M</p>
            <p className="mb-4 text-gray-400">
              Trading Volume in the last 24 hours
            </p>
            {chartDataVolume ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartDataVolume}>
                  <XAxis dataKey="date" tick={{ fill: "#fff" }} />
                  <YAxis tick={{ fill: "#fff" }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                  />
                  <Bar dataKey="Volume" fill="#3366CC" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>Loading chart...</p>
            )}
          </div>
        </div>

        {/* Token Table Section */}
        <div className="mt-8">
          <div className="bg-gray-800 p-1 rounded-lg shadow-lg">
            <TokenTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
