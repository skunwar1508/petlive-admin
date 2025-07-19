import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        maxheight: 10
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
      
    },
    scales:{
      x:{
            display: true,
            title: {
                display: true,
                text: "Month",
                color: 'red'
            }
      },
      y:{
            display: true,
            title: {
                display: true,
                text: "Value",
                color: 'red'
            }
      }
    }
  }
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

     const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth:1,
          borderSkipped: 'top',
          datalabels:{
            display: true,
            anchor: 'end',
            align: 'top'
          }
          
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderColor: 'rgba(53, 162, 235,1)',
          borderWidth:1,
          borderSkipped: 'top',
          datalabels:{
            display: true,
            anchor: 'end',
            align: 'top'
          }
        },
      
      
      ],
    };


const VerticalBarChart =()=>{
  return(
    <>
         <Bar
                 data={data}
                 width={null}
                    height={null}
                 options={options}
                 
             />
    </> 
    )
}
export default VerticalBarChart