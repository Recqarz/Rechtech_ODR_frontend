import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponentArbitrator = () => {
  const [chartData, setChartData] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("rechtechtoken");
      if (!token) {
        toast.error("Please login again");
        localStorage.removeItem("rechtechtoken");
        localStorage.removeItem("rechtechrole");
        navigate("/");
        return;
      }
      let tokens = JSON.parse(localStorage.getItem("rechtechtoken"));
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASEURL}/cases/chartdata/arbitrator`,
          {
            headers: { token: tokens },
          }
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
        // console.error("Error fetching chart data:", error);
        toast.error("Error fetching chart data");
      }
    };

    fetchData();
  }, []);

  const colors = ["#007bff", "#38a169", "#ffd700"]; // Blue, Green, Yellow shades

  return (
    <div className="w-full max-w-3xl px-6 py-4 mr-5 shadow-2xl bg-[#0f2d6b] text-white rounded-3xl">
      <h2 className="text-xl font-semibold mb-6">Case Completed</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barGap={10}>
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            fontSize={12}
            fontWeight="500"
            tick={{ fill: "#ffffff" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            fontSize={14}
            fontWeight="600"
            tick={{ fill: "#ffffff" }}
            domain={[0, "dataMax"]}
          />
          <CartesianGrid
            strokeDasharray="0"
            stroke="#4A5568"
            vertical={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              color: "#F9FAFB",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "12px",
            }}
            itemStyle={{ color: "#F9FAFB" }}
            cursor={false}
          />
          <Legend
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
              color: "#9CA3AF",
              fontSize: "12px",
              marginTop: "-20px",
            }}
            align="center"
            verticalAlign="top"
          />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              barSize={6}
              radius={[5, 5, 5, 5]}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponentArbitrator;
