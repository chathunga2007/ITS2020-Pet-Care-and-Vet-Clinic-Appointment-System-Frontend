import React, { useState } from "react";

interface AreaChartDataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: AreaChartDataPoint[];
  height?: number;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height = 200,
  color = "#0d9488",
  gradientFrom = "rgba(13, 148, 136, 0.45)",
  gradientTo = "rgba(13, 148, 136, 0.0)",
  valuePrefix = "",
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
  const minVal = 0;
  const paddingX = 40;
  const paddingY = 25;
  const chartWidth = 500;
  const chartHeight = height;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  // Map data to coordinates
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1 || 1)) * innerWidth;
    const y =
      chartHeight -
      paddingY -
      ((d.value - minVal) / (maxVal - minVal || 1)) * innerHeight;
    return { x, y, ...d };
  });

  // Generate smooth SVG bezier path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX1 = p0.x + (p1.x - p0.x) / 2;
    const cpY1 = p0.y;
    const cpX2 = p0.x + (p1.x - p0.x) / 2;
    const cpY2 = p1.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }

  // Area fill path closing to bottom
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY
    } L ${points[0].x} ${chartHeight - paddingY} Z`;

  const gradientId = `area-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full relative select-none">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = paddingY + innerHeight * (1 - pct);
          const gridVal = Math.round(minVal + (maxVal - minVal) * pct);
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
                x={paddingX - 10}
                y={y + 3}
                textAnchor="end"
                className="text-[9px] fill-slate-400 font-medium"
              >
                {gridVal}
              </text>
            </g>
          );
        })}

        <path d={areaD} fill={`url(#${gradientId})`} />

        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <g key={i}>
              <text
                x={p.x}
                y={chartHeight - 6}
                textAnchor="middle"
                className="text-[10px] fill-slate-500 dark:fill-slate-400 font-semibold"
              >
                {p.label}
              </text>

              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 6 : 4}
                fill={isHovered ? "#ffffff" : color}
                stroke={color}
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {isHovered && (
                <g>
                  <rect
                    x={p.x - 35}
                    y={p.y - 32}
                    width={70}
                    height={22}
                    rx={6}
                    className="fill-slate-900 dark:fill-slate-100 shadow-lg"
                  />
                  <text
                    x={p.x}
                    y={p.y - 18}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-white dark:fill-slate-900"
                  >
                    {valuePrefix}
                    {p.value}
                    {valueSuffix}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AreaChart;