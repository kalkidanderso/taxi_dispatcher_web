import React from "react";
import { Dashboard, Person,
     EditSharp, Report, LocalTaxi, RateReview,
      Remove, Add, LocationOn, DoubleArrow} from "@material-ui/icons";
import {
        UilClipboardAlt
      } from "@iconscout/react-unicons";
      
      // Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";


import {DriveEtaRounded} from "@material-ui/icons";      
import vehicle from "../../public/image/car/vehicle.jpeg";
import passenger from "../../public/image/car/passenger.png";
import driver from "../../public/image/car/driver.png";
import revenue from "../../public/image/car/revenue.png";


import vehicle2 from "../../public/image/ride_statistics/vehicle.png";
import cancelled from "../../public/image/ride_statistics/cancelled.png";
import completed from "../../public/image/ride_statistics/completed.png";
import progress from "../../public/image/ride_statistics/progress.png";

export const sidebarButtonLists = [
    {id: 1, name: "Dashboard", pathname: "/dashboard", Icon: <Dashboard />},
    {id: 2, name: "Passengers", pathname: "/passengers", Icon: <Person />},
    {id: 3, name: "Drivers", pathname: "/drivers", Icon: <DriveEtaRounded />},
    {id: 4, name: "Manual Booking", pathname: "/manual_booking", Icon: <EditSharp />},
    {id: 5, name: "Vehicle Type", pathname: "/vehicle_type", Icon: <LocalTaxi />},
    {id: 6, name: "Report", pathname: "/report", Icon: <Report />}, 
    {id: 7, name: "Review & Rating", pathname: "/review_and_rating", Icon: <RateReview />},
    {id: 8, name: "Register", pathname: "/register", Icon: <Add />},
    {id: 20, name: "Register Driver", pathname: "/register_driver", Icon: <DoubleArrow />},
    {id: 21, name: "Register Dispatcher", pathname: "/register_dispatcher", Icon: <DoubleArrow />},
    {id: 9, name: "Remove", pathname: "/remove", Icon: <Remove />},
    {id: 10, name: "Remove Driver", pathname: "/remove_driver", Icon: <DoubleArrow />},
    {id: 11, name: "Remove Dispatcher", pathname: "/remove_dispatcher", Icon: <DoubleArrow />},
    {id: 12, name: "Track User", pathname: "/track_user", Icon: <LocationOn />},
    {id: 13, name: "Track User", pathname: "/track_user", Icon: <LocationOn />},
    {id: 14, name: "Track User", pathname: "/track_user", Icon: <LocationOn />},
];

export const tripStatistics = [
    {id: 1, name: "VehicleType", "amount": 40, Icon: vehicle},
    {id: 2, name: "Drivers", "amount":60, Icon: driver},
    {id: 3, name: "Passengers", "amount": 100, Icon: passenger},
    {id: 4, name: "Income", amount: 660.43, Icon: revenue},

];
export const rideStatistics = [
    {id: 1, name: "Total Rides", "amount": 100, Icon: vehicle2},
    {id: 2, name: "Running Rides", "amount":60, Icon: progress},
    {id: 3, name: "Completed Rides", "amount":40, Icon: completed},
    {id: 4, name: "Canceled Rides", "amount":20, Icon: cancelled},
];

export const cardsData = [
    {
      title: "Revenue In Last 24 Hour",
      footer: "Last 24 hour",
      color: {
        // backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",#aa076b → #61045f
        backGround: "linear-gradient(180deg, #aa076b 0%, #61045f 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "25,970",
      png: UilUsdSquare,
      series: [
        {
          name: "Revenue",
          data: [31, 40, 28, 51, 42, 109, 100],
          style: {color: "white",}
        },
      ],
    },
    {
      title: "Revenue In This Month",
      footer: "In This Month",
      color: {
        // backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)", → #753a88
        backGround: "linear-gradient(180deg, #cc2b5e 0%, #753a88 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "14,270",
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: [10, 30, 50, 70, 30, 40, 90],
        },
      ],
    },
    
    {
      title: "Expenses",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: "4,270",
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20, 90, 80, 70, 30, 10],
        },
      ],
    },
  ];

  export const chartsData = [{
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
       
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      yaxis: { 
      labels: {
        style: {
            colors: 'white',  
            fontSize: "15px", 
            fontFamily: "Arial, Helvetica, sans-serif",
        },
      },
    },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-05-02T00:00:00.000Z",
          "2022-05-02T01:30:00.000Z",
          "2022-05-02T02:30:00.000Z",
          "2022-05-02T03:30:00.000Z",
          "2022-05-02T04:30:00.000Z",
          "2022-05-02T05:30:00.000Z",
          "2022-05-02T06:30:00.000Z",
        ],
        labels: {
        style: {
            colors: 'white',  
            fontSize: "15px", 
            fontFamily: "Arial, Helvetica, sans-serif",
        },
      },
      },
    },
  },
  {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      yaxis: { 
        labels: {
          style: {
              colors: 'white',  
              fontSize: "15px", 
              fontFamily: "Arial, Helvetica, sans-serif",
          },
        },
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "MM yyyy",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "month",
        categories: [
          "January",
          "February",
          "April",
          "June",
          "August",
          "Septm",
          "Decem",
        ],
        labels: {
          style: {
              colors: 'white',  
              fontSize: "15px", 
              fontFamily: "Arial, Helvetica, sans-serif",
          },
        },
      },
    },
  },
  
];