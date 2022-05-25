import { useRef } from "react";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// const addActionRef = useRef(null);

export  const columns = {
  RecentDataColumns : [
    { title: 'Id', field: 'id'},
    { title: 'Passenger Name', field: 'Passenger_Name' },
    { title: 'Driver Name', field: 'Driver_Name'},
    { title: 'Pic/Drop Address', field: 'Pic_Drop' },
    { title: 'Date', field: 'Date' },
    { title: 'Payment', field: 'Payment', type: "currency", align:"left" },
    {title: 'Status', field: "Status"}
  ],
  PassengersColumns : [
    { title: 'Id', field: '_id'},
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email'},
    { title: 'Contact No', field: 'phoneNumber' },
    { title: 'City', field: 'city' },
    { title: 'Sub City', field: 'address'},
    {title: 'Review', field: "review"},
    {title: "Custom Add",
     field: "internal_action",
     editable: false,
     render: (rowData) => 
     
         rowData && (
           <IconButton color="secondary"
                       onClick={() => console.log("Goona be ", rowData.id)}
           >
             <button className="makeChange">Ride History</button>
             <button className="active">active</button>
           </IconButton>
         )  
  }
  ],
  DriversColumns : [
    { title: 'Id', field: 'id'},
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email'},
    { title: 'Contact No', field: 'contact_no' },
    { title: 'City', field: 'city' },
    { title: 'Sub City', field: 'sub_city'},
    {title: 'Review', field: "review"},
    {title: "Custom Add",
     field: "internal_action",
     editable: false,
     render: (rowData) => 
     
         rowData && (
           <IconButton color="secondary"
                       onClick={() => console.log("Goona be ", rowData.id)}
           >
             <button className="makeChange">Ride History</button>
             <button className="active">active</button>
             <button className="active">Document</button>
           </IconButton>
         )  
  }
  ]   
}
