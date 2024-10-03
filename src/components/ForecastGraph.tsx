import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
      return forecastDate >= new Date(); // Only future dates
    })
    .map((forecast: ForecastEntry) => ({
      date: new Date(forecast.Date).toLocaleDateString(),
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

  return (
    <div className="mt-4">
      <strong>Forecast:</strong>
      <ResponsiveContainer width="100%" height={200}>
        {/* Adjust the height here */}
        <AreaChart
          data={forecastData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }} // Make the date font size smaller
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12 }} // Make the value font size smaller
            domain={[yAxisMin, yAxisMax]} // Reduce the Y-axis height by restricting the range
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => [
              `$${value.toLocaleString()}`,
              "Forecast Value",
            ]} // Customize label
            labelFormatter={(label) => `Date: ${label}`}
          />
          {/* <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            labelFormatter={(label) => `Forecast Value: ${label}`}
          /> */}
          <Area
            type="monotone"
            dataKey="forecastValue"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorForecast)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastGraph;
