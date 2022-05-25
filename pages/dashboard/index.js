import React from 'react'
// import SideBar from "../../components/SideBar/SideBar";
// import NavBar from "../../components/NavBar/index";
// import MainContent from "../../components/MainContent/index";
// import MainContent from "../../components/Contents/DashboardContent/index";

import styles from "./dashboard.module.css";

import dynamic from 'next/dynamic';
const SideBar = new dynamic(() => import("../../components/SideBar/SideBar"), {ssr: false});
const NavBar = new dynamic(() => import("../../components/NavBar"), {ssr: false});
const MainContent = new dynamic(() => import("../../components/Contents/DashboardContent/index"), {ssr: false});

export default function Dashboard() {
  return (
    <div className={styles.App}>
       <NavBar /> 
        <div className={styles.mainBody}>
        <SideBar actives="Dashboard"/> 
        <MainContent />
        </div>
    </div>
  )
}
