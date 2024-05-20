import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

import style from "./Statistic.module.css";

function Statistics() {
  const data = [
    { name: "기쁨", value: 200 },
    { name: "슬픔", value: 100 },
    { name: "우울", value: 50 },
    { name: "화남", value: 70 },
  ];

  return (
    <div className={style.App}>
      <h1 className={style.mind_h1}>기분 통계</h1>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={150}
          cy={150}
          outerRadius={60}
          fill="#8884d8"
          label={true}
        />

        <Tooltip />
      </PieChart>
      <div className={style.barchart}>
        <BarChart
          width={200}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -10,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" label={false} />
        </BarChart>
      </div>
    </div>
  );
}
export default Statistics;
