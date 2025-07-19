import React from 'react';
import {Line} from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables)

const labels=["Calculus", "Programming Paradigms", "Data Structures", "Relational Databases", "Computer Graphics"],
 data={
      labels,
      datasets:[
             {
                 label: "Student 1",
                 data:[70, 60, 79, 87, 76],
                 backgroundColor:'rgba(255, 99, 132, 0.5)',
                 borderColor: 'rgb(255,99,132)',
                 tension: 0.4,
                 datalabels:{
                     display: false
                 },
                 pointStyle: 'circle',
                 pointRadius: 10,
                 pointHoverRadius: 15
            }
      ]
}
const options={
      plugins:{
          legend:{
              position: 'top'
          },
          title:{
              text:"Curved Chart"
          }
      },
      scales:{
        x:{
              display: true,
              title: {
                  display: true,
                  text: "Subject",
                  color: 'red'
              }
        },
        y:{
              display: true,
              title: {
                  display: true,
                  text: "Marks",
                  color: 'red'
              }
        }
      },
}
const CurvedLineChart =()=>{
    return(
        <>
               <Line
                   data={data}
                   options={options}
               />
        </>
    )
}
export default CurvedLineChart