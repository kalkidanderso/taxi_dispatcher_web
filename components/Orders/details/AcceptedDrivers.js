import React, { useEffect, useState } from "react";
import classes from "../../Contents/DashboardContent/main.module.css";
import Table from "../../elements/Table/PendingTable";
import { IconButton } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function PendingDetails(props) {
  const setOfPendingItem = [];
  setOfPendingItem.push(props.pendingItem);

  const [showTable, setShowTable] = useState(true);

  const dispatchVehicleHandler = (data) => {
    // props.sendRequestToDrivers(data);
    props.notifyPassengers(data);
  };
  const pendingDetailColumns = [
    { title: "Phone Number", field: "phoneNumber" },
    { title: "Email", field: "email" },
    { title: "Vehicle Type", field: "vehicleType" },
  ];
  // filter_history();

  // console.log(props.acceptedDriverData);
  return (
    <div style={{ marginTop: "20px" }} className={classes.mainDivision}>
      {/* <h3>Accepted Drivers</h3> */}
      <div className={classes.tables}>
        <div className={classes.table}>
          <Table
            TableData={props.acceptedDriverData}
            TableColumn={pendingDetailColumns}
            title="Accepted Driver"
            // title={
            //   `${setOfPendingItem[0].pickupLocation}` +
            //   `,          ${setOfPendingItem[0].destination}`
            // }
            // <LocationOnIcon /> +
            // setOfPendingItem[0].pickupLocation +
            // setOfPendingItem[0].destination
            // }
          />
        </div>
      </div>
      <div className={classes.lowerDivsions}>
        <button
          onClick={() => dispatchVehicleHandler(props.acceptedDriverData)}
          className={classes.save}
        >
          Notify Passengers
        </button>
      </div>
    </div>
  );
}

export default PendingDetails;
