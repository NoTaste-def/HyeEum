import React, { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   BarChart,
//   XAxis,
//   YAxis,
//   Legend,
//   CartesianGrid,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";

import style from "./Statistic.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadModal from "./LoadModal";

const URL =
  "https://port-0-hyeeum-backend-9zxht12blqj9n2fu.sel4.cloudtype.app/";
const MSG = "통계를 가져오고 있어요";

function Statistics() {
  const { id } = useParams();
  const [statistic, setStatistic] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // const lib = JSON.parse(localStorage.getItem("library"));
    // const user = JSON.parse(localStorage.getItem("local_user"));
    // setStatistic(lib[0].statistics);

    axios
      .get(`${URL}statistics/${id}`)
      .then((res) => {
        console.log(res.data);
        setStatistic(res.data);
      })
      .catch((err) => {
        console.error("Err", err);
      });
  }, []);

  if (!statistic) {
    return <LoadModal msg={MSG} />;
  }

  // const data = [
  //   { name: "화남", value: statistic.aggro },
  //   { name: "기쁨", value: statistic.happiness },
  //   { name: "슬픔", value: statistic.sadness },
  //   { name: "즐거움", value: statistic.joy },
  // ];

  const aggro = Array(statistic.aggro).fill(0);
  const happiness = Array(statistic.happiness).fill(0);
  const sadness = Array(statistic.sadness).fill(0);
  const joy = Array(statistic.joy).fill(0);

  // const getIntroOfPage = (label) => {
  //   if (label === "Page A") {
  //     return "Page A is about men's clothing";
  //   }
  //   if (label === "Page B") {
  //     return "Page B is about women's dress";
  //   }
  //   if (label === "Page C") {
  //     return "Page C is about women's bag";
  //   }
  //   if (label === "Page D") {
  //     return "Page D is about household goods";
  //   }
  //   if (label === "Page E") {
  //     return "Page E is about food";
  //   }
  //   if (label === "Page F") {
  //     return "Page F is about baby food";
  //   }
  //   return "";
  // };

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${label} : ${payload[0].value}`}</p>
  //         {/* <p className="intro">{getIntroOfPage(label)}</p> */}
  //         {/* <p className="desc">Anything you want can be displayed here.</p> */}
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>감정 풍경</h1>
      <div className={style.statisticWrapper}>
        <div className={style.chartWrapper}>
          <div className={style.chartCon}>
            {aggro.map((a, i) => {
              return <div key={i} className={style.aggroBar} />;
            })}
            <span>{statistic.aggro}</span>
          </div>
          <div className={style.chartCon}>
            {happiness.map((a, i) => {
              return <div key={i} className={style.happyBar} />;
            })}
            <span>{statistic.happiness}</span>
          </div>
          <div className={style.chartCon}>
            {sadness.map((a, i) => {
              return <div key={i} className={style.sadBar} />;
            })}
            <span>{statistic.sadness}</span>
          </div>
          <div className={style.chartCon}>
            {joy.map((a, i) => {
              return <div key={i} className={style.joyBar} />;
            })}
            <span>{statistic.joy}</span>
          </div>
          {/* <PieChart width={150} height={150}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            // cx={100}
            // cy={100}
            outerRadius={30}
            fill="rgb(200, 195, 123)"
            label={true}
          />
          <Tooltip />
        </PieChart>
        <div className={style.barchart}>
          <BarChart
            width={100}
            height={100}
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
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="rgb(200, 195, 123)" label={false} />
          </BarChart>
        </div> */}
        </div>
        <div className={style.chartLabel}>
          <span>화남</span>
          <span>기쁨</span>
          <span>슬픔</span>
          <span>즐거움</span>
        </div>
      </div>
      {statistic.gpt_comment ? (
        <div className={style.gptComment}>
          {statistic.gpt_comment
            .replace(". ", ".\n")
            .replace("! ", "!\n")
            .replace("? ", "?\n")
            .replace(", ", ",\n")}
        </div>
      ) : null}

      <div
        className={style.toMainBtn}
        onClick={() => {
          navigate("/main");
        }}
      >
        터치 후 메인으로 이동
      </div>
    </div>
  );
}
export default Statistics;
