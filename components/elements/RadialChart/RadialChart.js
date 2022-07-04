import React from 'react'
import styles from "./radialChart.module.css";
// import Image from "next/image";
import { DataUsage } from "@material-ui/icons";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import ("react-apexcharts"), {ssr: false});
const Image = dynamic(() => import ("next/image"), {ssr: false});
function RadialChart(props) {
    
  const datas = {
    title: "Rides Information",
    options: {
          series: [120, 60, 40, 20],
          colors: ['#0000FF', '#FFD700', '#008000', '#FF0000'],
          labels: ['Total', 'Running', 'Completed', 'Cancelled'],
          legend: {
            show: true,
            fontSize: '18px',
            position: 'left',
            fontFamily: "Arial, Helvetica, sans-serif",
            offsetX: 80,
            offsetY: 16,
            floating: true,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 10
            },
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
              vertical: 1
            }
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '10%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              }
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                  show: false
              }
            }
          }],
      chart: {
        type: 'radialBar',
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
<Chart options={datas.options} series={datas.options.series} type="radialBar" height={390} />
 </div>
  </div>
</div>
);

}

export default RadialChart