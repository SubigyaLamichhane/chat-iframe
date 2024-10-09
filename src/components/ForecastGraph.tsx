import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line,
  LineChart,
} from "recharts";

import { ForecastEntry, Property } from "../types";

// Custom formatter for Y-axis (e.g., 1000 -> 1k, 1000000 -> 1M)
const formatYAxis = (tickItem: number): string => {
  if (tickItem >= 1000000) return `${(tickItem / 1000000).toFixed(1)}M`;
  if (tickItem >= 1000) return `${(tickItem / 1000).toFixed(1)}k`;
  return tickItem.toString(); // Convert to string for compatibility
};

const ForecastGraph = ({ property }: { property: Property }) => {
  if (!property.Forecast) return null;
  const forecastData = JSON.parse(property.Forecast)
    .filter((forecast: ForecastEntry) => {
      if (!forecast) return false;
      const forecastDate = new Date(forecast.Date);
      // return forecastDate >= new Date(); // Only future dates
      return forecastDate;
    })
    .map((forecast: ForecastEntry) => ({
      date: new Date(forecast.Date).getTime(),
      forecastValue: parseFloat(forecast.ForecastValue as string),
    }));

  // get the first 5 forecast data
  //   const forecastData = forecastDataNotSliced.slice(0, 7);
  //   console.log(
  //     forecastDataNotSliced,
  //     forecastData,
  //     forecastDataNotSliced.length
  //   );

  // Calculate the Y-axis starting point
  const firstValue = forecastData[0]?.forecastValue || 0;
  const secondValue = forecastData[1]?.forecastValue || firstValue;
  const yAxisMin = firstValue - (secondValue - firstValue);
  const yAxisMax = firstValue + (secondValue - firstValue) * 2; // Reduce the Y-axis range
  const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD, if your data uses this format

  // add today's forecast
  // forecastData.push({
  //   date: today.,
  //   forecastValue: "",
  // });

  // sort the forecast data by date (lowest first)
  // forecastData.sort((a: any, b: any) => {
  //   return new Date(a.date).getTime() - new Date(b.date).getTime();
  // });

  // Log to check if today's date matches your data
  console.log("Today's Date: ", today);
  console.log("Forecast Data: ", forecastData);

  return (
    <div className="mt-8">
      <strong className="mb-8">Forecast:</strong>
      <div className="mt-4 scale-110">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={forecastData}
            margin={{ top: 15, right: 23, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              type="number" // Specify it as a number since it's now a timestamp
              domain={["dataMin", "dataMax"]}
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }}
              tick={{ fontSize: 10 }} // Make the date font size smaller
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }} // Make the value font size smaller
              domain={[yAxisMin, yAxisMax * 1.08]} // Increase the upper limit by 10%
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value, name, props) => {
                // Compare the current label (date) with today's date
                if (props.payload.date === today) {
                  return null; // Hide tooltip if it's today
                }
                return [`$${value.toLocaleString()}`, "Forecast"];
              }}
              labelFormatter={(label) =>
                `Date: ${new Date(label).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}`
              }
            />

            {/* Today as a reference line */}
            <ReferenceLine
              x={new Date(today).getTime()} // Pass the correct `today` value
              // label="Today"
              stroke="blue"
              strokeDasharray="3 3"
              label={{
                value: "Today",
                position: "top",
                fontSize: 12,
                fill: "blue",
              }}
            />

            <Line
              type="monotone"
              dataKey="forecastValue"
              stroke="#8884d8"
              dot={false} // Disable dots on the line
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastGraph;
