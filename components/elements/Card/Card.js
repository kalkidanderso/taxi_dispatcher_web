import React from "react";
import styles from "./Card.module.css";
// import Image from "next/image";
import { DataUsage } from "@material-ui/icons";
import dynamic from "next/dynamic";

const Image = new dynamic(() => import("next/image"), {ssr: false});
const Card = (props) => {
  return (
    <div className={styles.Card}>
      <div className={styles.titleDivision}>
         <div className={styles.titleIcon}>
         <DataUsage />
         </div>

        <p className={styles.title}>{props.title}</p>
      </div>
      <div className={styles.bodyDivision}>
      {props.statistics.map(stat => {
          return(
        <div className={styles.item}>
          <div className={styles.iconArea}>
            <Image className={styles.image} src={stat.Icon} alt="Icon here"></Image>
          </div>
          <div className={styles.textArea}>
            <p className={styles.textItem}>{stat.name}</p>
            <p className={styles.textItem}>{stat.id === 4 && stat.name==="Income" ? "$" : ""} {stat.amount}</p>
          </div>
        </div> 
      )})}
      </div>
    </div>
  );
         
};

export default Card;
