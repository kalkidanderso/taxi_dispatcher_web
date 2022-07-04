import React from 'react'
import styles from "./chart.module.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import dynamic from "next/dynamic";
import { cardsData } from '../../Data/data';
const Chart = dynamic(() => import ("react-apexcharts"), {ssr: false});

const Charts = (props) => {
    return (
        <AnimateSharedLayout>
            <ExpandedCard  chartsData={props.chartsData} cardsData={props.cardsData}/>
        </AnimateSharedLayout>
      )
}

export default Charts;

function ExpandedCard({ chartsData, cardsData }) {
   
    return (
      <motion.div
        className={styles.ExpandedCard}
        style={{
          background: cardsData.color.backGround,
          boxShadow: cardsData.color.boxShadow,
        }}
        layoutId="expandableCard"
      >
        <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
          <UilTimes  />
        </div>
          <span>{cardsData.title}</span>
        <div className={styles.chartContainer}>
          <Chart options={chartsData.options} series={cardsData.series} type="area" />
        </div>
        <span>{cardsData.footer}</span>
      </motion.div>
    );
  }
  