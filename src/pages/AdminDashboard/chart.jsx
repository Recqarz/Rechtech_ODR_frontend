import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASEURL}/cases/chartdata`
        );
        const data = await response.json();

        setChartData(data);
        const dynamicKeys = Array.from(
          new Set(
            data.flatMap((item) =>
              Object.keys(item).filter((key) => key !== "week")
            )
          )
        );
        setKeys(dynamicKeys);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-2xl px-6 py-4   bg-blue-50 border-[1.5px] border-black rounded-3xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Case Completed
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            fontSize={12}
            fontWeight="500"
            tick={{ fill: "#4A5568" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            fontSize={14}
            fontWeight="600"
            tick={{ fill: "#4A5568" }}
            domain={[0, "dataMax"]}
          />
          <CartesianGrid strokeDasharray="5 5" stroke="#e2e8f0" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2D3748",
              color: "#F7FAFC",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
            }}
            itemStyle={{ color: "#F7FAFC" }}
            cursor={{ stroke: "#CBD5E0", strokeWidth: 1 }}
          />
          <Legend
            iconType="circle"
            iconSize={12}
            wrapperStyle={{ fontSize: 16, color: "#4A5568" }}
            align="center"
            verticalAlign="bottom"
          />
          {keys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={
                ["#4C51BF", "#38A169", "#DD6B20", "#E53E3E", "#319795"][
                  index % 5
                ]
              }
              strokeWidth={2}
              dot={{ r: 3 }}
              name={key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
