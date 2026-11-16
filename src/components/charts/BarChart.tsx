import React, { useState } from "react";

interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartDataPoint[];
  height?: number;
  barColor?: string;
  valueSuffix?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 200,
  barColor = "#0d9488",
  valueSuffix = "",
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center text-xs text-slate-400"
      >
        No chart data available
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 1);
  const chartWidth = 500;
  const chartHeight = height;
  const paddingX = 30;
  const paddingBottom = 30;
  const paddingTop = 20;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const barCount = data.length;
  const gap = 16;
  const totalGaps = (barCount - 1) * gap;
  const barWidth = Math.min(Math.max((innerWidth - totalGaps) / barCount, 16), 48);

  return (
    <div className="w-full relative select-none">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        {[0, 0.5, 1].map((pct, idx) => {
          const y = paddingTop + innerHeight * (1 - pct);
          const gridVal = Math.round(maxVal * pct);
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={chartWidth - paddingX}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[9px] fill-slate-400 font-medium"
              >
                {gridVal}
              </text>
            </g>
          );
        })}

        {data.map((item, i) => {
          const barHeight = Math.max((item.value / maxVal) * innerHeight, 4);
          const x = paddingX + i * (barWidth + gap);
          const y = paddingTop + innerHeight - barHeight;
          const isHovered = hoveredIdx === i;
          const currentBarColor = item.color || barColor;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <rect
                x={x}
                y={paddingTop}
                width={barWidth}
                height={innerHeight}
                rx={6}
                className="fill-slate-100 dark:fill-white/5 transition-opacity"
                opacity={isHovered ? 0.8 : 0.4}
              />

              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={6}
                fill={currentBarColor}
                opacity={isHovered ? 1 : 0.85}
                className="transition-all duration-300"
              />

              <text
                x={x + barWidth / 2}
                y={y - 6}
                textAnchor="middle"
                className={`text-[10px] font-bold transition-opacity ${isHovered
                  ? "fill-teal-700 dark:fill-teal-300 opacity-100 font-extrabold"
                  : "fill-slate-500 opacity-70"
                  }`}
              >
                {item.value}
                {valueSuffix}
              </text>

              <text
                x={x + barWidth / 2}
                y={chartHeight - 8}
                textAnchor="middle"
                className="text-[10px] fill-slate-500 dark:fill-slate-400 font-semibold truncate"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;