import React from "react";
// import SideBar from "../../components/SideBar/SideBar";
// import NavBar from "../../components/NavBar/index";
// import MainContent from "../../components/MainContent/index";
// import MainContent from "../../components/Contents/DashboardContent/index";

import styles from "./dashboard.module.css";

import dynamic from "next/dynamic";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar";
import FooterBar from "../../components/FooterBar";
import MainContent from "../../components/Contents/DashboardContent/index";
import { useRouter } from "next/router";
import { useEffect } from "react";
function Dashboard({
  proceedingRides,
  pendingRides,
  completedRides,
  cancelledRides,
  history,
  avilableDrivers,
}) {
  const router = useRouter();
  useEffect(() => {
    // alert(router.query.name);
  }, [router.query]);
  pendingRides.map((pen) => {});
  return (
    <div className={styles.App}>
      <NavBar name={router.query.name} />
      <div className={styles.mainBody}>
        {/* <SideBar actives="Dashboard"/>  */}
        <MainContent
          pendingRides={pendingRides}
          proceedingRides={proceedingRides}
          completedRides={completedRides}
          cancelledRides={cancelledRides}
          history={history}
          avilableDrivers={avilableDrivers}
        />
      </div>
      {/* <FooterBar /> */}
    </div>
  );
}

export async function getServerSideProps() {
  const connection_string = "http://localhost:3000/api/";
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const [
    pendingRidesDB,
    proceedingRidesDB,
    completedRidesDB,
    cancelledRidesDB,
    historyDB,
    AvailableDriversDB,
  ] = await Promise.all([
    fetch(connection_string + "pendingRides", headers),
    fetch(connection_string + "proceedingRides", headers),
    fetch(connection_string + "completedRides", headers),
    fetch(connection_string + "cancelledRides", headers),
    fetch(connection_string + "rides", headers),
    fetch(connection_string + "avilableDrivers", headers),
  ]);

  const pendingRidesCollection = await pendingRidesDB.json();
  const pendingRides = pendingRidesCollection.pendingRides;

  const proceedingRidesCollection = await proceedingRidesDB.json();
  const proceedingRides = proceedingRidesCollection.proceedingRides;

  const completedRidesCollection = await completedRidesDB.json();
  const completedRides = completedRidesCollection.completedRides;

  const cancelledRidesCollection = await cancelledRidesDB.json();
  const cancelledRides = cancelledRidesCollection.cancelledRides;

  const historyCollection = await historyDB.json();
  const history = historyCollection.history;

  const availableDriversCollection = await AvailableDriversDB.json();
  const avilableDrivers = availableDriversCollection.pendingDrivers;

  return {
    props: {
      proceedingRides,
      pendingRides,
      completedRides,
      cancelledRides,
      history,
      avilableDrivers,
    },
  };
}

export default Dashboard;
