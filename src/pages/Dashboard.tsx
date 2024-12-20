import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TokenTable from "../components/TokenTable";
import { Token } from "../types/token";
import axios from "axios";
import {
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  AreaChart,
  Area,
  Brush,
} from "recharts";

interface ChartData {
  date: string;
  TVL?: number;
  Volume?: number;
}

const Dashboard: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]); // State để lưu trữ dữ liệu tokens từ JSON Server
  const [chartDataTVL, setChartDataTVL] = useState<ChartData[] | null>(null);
  const [chartDataVolume, setChartDataVolume] = useState<ChartData[] | null>(null);

  // Fetch dữ liệu từ JSON Server (top_tokens)
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await axios.get("http://localhost:5000/top_tokens"); // Endpoint lấy dữ liệu từ JSON Server
        setTokens(res.data); // Cập nhật dữ liệu tokens vào state
      } catch (error) {
        console.error("Error fetching tokens data:", error);
      }
    };

    fetchTokens();

    // Fetch dữ liệu cho biểu đồ TVL và Volume 24H
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
        <div className="flex space-x-6">
          {/* TVL Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
            <h2 className="text-2xl font-bold mb-4">TVL</h2>
            <p className="text-lg">$5.32B</p>
            <p className="mb-4">Total Value Locked</p>
            {chartDataTVL ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartDataTVL}>
                  <XAxis dataKey="date" tick={{ fill: "#fff" }} />
                  <YAxis tick={{ fill: "#fff" }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="TVL"
                    stroke="#4bc0c0"
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p>Loading chart...</p>
            )}
          </div>

          {/* Volume 24H Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
            <h2 className="text-2xl font-bold mb-4">Vol
