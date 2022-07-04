import React, { useEffect, useState } from "react";
import classes from "../../Contents/DashboardContent/main.module.css";
import Table from "../../elements/Table/PendingTable";
import { IconButton } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function PendingDetails(props) {
  const setOfPendingItem = [];
  setOfPendingItem.push(props.pendingItem);

  const [showTable, setShowTable] = useState(true);

  const dispatchVehicleHandler = (Item) => {
    props.retrievePendingDrivers(Item);
  };
  const retrievePendingDriversVip = (rowData) => {
    props.retrievePendingDriversVip(rowData);
  };

  let filtered_history = [];
  let { history } = props;
  const filter_history = () => {
    history.map((hist) => {
      if (hist.status === "pending") {
        if (filtered_history.length <= 9)
          if (
            setOfPendingItem[0].pickupLocation === hist.pickupLocation &&
            setOfPendingItem[0].destination === hist.destination
          ) {
            let newHist = {
              phoneNumber: hist.phoneNumber,
              vehicleType: hist.vehicleType,
            };
            filtered_history.push(newHist);
          }
      }
    });
  };

  const pendingDetailColumns = [
    { title: "Phone Number", field: "phoneNumber" },
    { title: "Vehicle Type", field: "vehicleType" },
    {
      title: "Custom Add",
      field: "internal_action",
      editable: false,
      render: (rowData) =>
        rowData.vehicleType === "vip" && (
          <IconButton
            color="secondary"
            onClick={() => retrievePendingDriversVip(rowData)}
          >
            <button className={classes.saver}>Dispatch</button>
          </IconButton>
        ),
    },
  ];
  filter_history();
  // console.log(filtered_history);
  return (
    <div className={classes.mainDivision}>
      <div className={classes.tables}>
        <div className={classes.table}>
          <Table
            TableData={filtered_history}
            TableColumn={pendingDetailColumns}
            title={
              `${setOfPendingItem[0].pickupLocation}` +
              `,          ${setOfPendingItem[0].destination}`
            }
            // <LocationOnIcon /> +
            // setOfPendingItem[0].pickupLocation +
            // setOfPendingItem[0].destination
            // }
          />
        </div>
      </div>
      <div className={classes.lowerDivsions}>
        {props.pendingItem.totalBusPassenger === 10 && (
          <button
            onClick={() => dispatchVehicleHandler(props.pendingItem)}
            className={classes.save}
          >
            Dispatch
          </button>
        )}
      </div>
    </div>
  );
}

export default PendingDetails;
