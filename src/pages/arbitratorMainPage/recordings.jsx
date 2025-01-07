import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Recordings = () => {
  let data = useSelector((state) => state.recordingsData);
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl px-6 py-2 m-auto overflow-x-hidden">
        <h1 className="text-2xl font-bold text-gray-900 ml-10 mt-3 md:ml-0 md:mt-0">
          Recordings
        </h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
                Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 hidden md:table-cell">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 hidden lg:table-cell">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 hidden lg:table-cell">
                Topic
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-1 text-sm text-gray-900 border-b border-gray-200">
                  <Link className="text-blue-700 hover:underline" to={item.playbackUrl} target="_blank">View</Link>
                </td>
                <td className="px-6 py-1 text-sm text-gray-900 border-b border-gray-200">
                  {item.password || "N/A"}
                </td>
                <td className="px-6 py-1 text-sm text-gray-900 border-b border-gray-200 hidden md:table-cell">
                  {item.timeRecorded
                    ?.split("T")[0]
                    ?.split("-")
                    ?.reverse()
                    ?.join("-") || "N/A"}
                </td>
                <td className="px-6 py-1 text-sm text-gray-900 border-b border-gray-200 hidden lg:table-cell">
                  {item.durationSeconds
                    ? `${Math.floor(item.durationSeconds / 60)} min`
                    : "N/A"}
                </td>
                <td className="px-6 py-1 text-sm text-gray-900 border-b border-gray-200 hidden lg:table-cell">
                  {item.topic || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recordings;
