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
    const fetchDataFromURL = async () => {
      try {
        const response = await fetch("/chart1.json");
        const data = await response.json();

        const chartLabels = data.map((item: { timestamp: number }) => {
          const date = new Date(item.timestamp);
          return `${date.getHours()}:${date.getMinutes()}`;
        });

        const tvlValues = data.map((item: { TVL: number }) => item.TVL);
        const volumeValues = data.map(
          (item: { Volume: number }) => item.Volume
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
      } catch (error) {
        console.error("Error fetching data from URL:", error);
      }
    };

    fetchDataFromURL();
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
