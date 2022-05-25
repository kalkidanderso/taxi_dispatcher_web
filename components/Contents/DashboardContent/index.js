import React, {useEffect, useState} from 'react'
import classes from "./main.module.css";
import { tripStatistics, rideStatistics } from '../../Data/data';


import dynamic from 'next/dynamic'


export default function index() {

  return (
    
    <div className={classes.mainContent}>
      <div className={classes.upperDivision}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci modi harum tenetur, corrupti veniam molestiae architecto inventore eos quod fugiat quisquam eveniet officia, quaerat illum qui necessitatibus ullam unde quia?
        </p>
      </div>
      <div className={classes.lowerDivision}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem repellendus repellat dolorem, minima consequatur et sint nemo assumenda, earum id quae omnis inventore reprehenderit nam nisi rerum similique amet eum.
      </div>
    </div>
  )
}
