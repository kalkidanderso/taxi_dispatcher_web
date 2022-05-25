import React from "react";
import classes from "./NavButton.module.css";

const Index = (props) => {
      const id = props.id;
      let newClass = "";
      let newImage = "";
      if(id === 20 || id === 21 || id === 10 || id === 11){
         newClass = "friendsNew";
         newImage = "imagesNew";
      }
      else{
        newClass = "friends";
        newImage = "image";
      }
      return (
        <div
          className={classes[newClass]}
          title={props.type}
          onClick={props.onChanges}
          >
            <div className={classes[newImage]}>
            {props.icons}
            </div>
          <p className={classes.friendsLabel}>{props.type}</p>
        </div>
      );
      
};

export default Index;
