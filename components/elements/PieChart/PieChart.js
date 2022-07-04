import React from "react";
import styles from "./pieChart.module.css";
// import Image from "next/image";
import { DataUsage } from "@material-ui/icons";


import dynamic from "next/dynamic";
const Chart = dynamic(() => import ("react-apexcharts"), {ssr: false});
const Image = dynamic(() => import ("next/image"), {ssr: false});

const PieChart = (props) => {
    const data = {
        title: "Drivers Information",
        options: {
        series: [40, 10, 6, 4],
        labels: ["Approved Drivers", 
         "Pending Drivers",
          'Warnned Drivers',
        "Blocked Drivers",
    
        ],
          chart: {
            type: 'donut',
          },
                 
        },
      
      
      };
  return (
    <div className={styles.Card}>
      <div className={styles.titleDivision}>
         <div className={styles.titleIcon}>
         <DataUsage />
         </div>

        <p className={styles.title}>{props.title}</p>
      </div>
      <div className={styles.bodyDivision}>
      <div style={{width: "75%", marginLeft: "30px"}}>
   <Chart options={data.options} series={data.options.series} type="donut" />
     </div>
      </div>
      <span>{data.title}</span>
    </div>
  );
         
};

export default PieChart;
