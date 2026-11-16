import React, { useState } from "react";

interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  size?: number;
  strokeWidth?: number;
  centerTitle?: string;
  centerSubtitle?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  strokeWidth = 24,
  centerTitle,
  centerSubtitle = "Total",
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (total === 0) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center text-xs text-slate-400 mx-auto"
      >
        No distribution data
      </div>
    );
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let currentOffset = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-white/5"
          />

          {data.map((slice, i) => {
            const percentage = slice.value / total;
            const strokeDasharray = `${circumference * percentage} ${circumference}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += circumference * percentage;
            const isHovered = hoveredIdx === i;

            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            {hoveredIdx !== null ? data[hoveredIdx].value : centerTitle || total}
          </span>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {hoveredIdx !== null ? data[hoveredIdx].label : centerSubtitle}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {data.map((slice, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center gap-1.5 text-xs transition-opacity cursor-pointer ${hoveredIdx !== null && hoveredIdx !== i ? "opacity-40" : "opacity-100"
              }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: slice.color }}
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {slice.label}:
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {slice.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;