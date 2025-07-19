import React from "react";
import faker from 'faker';
import { Line } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js'
  Chart.register(...registerables);

//Point styling- Pointstyle, pointradius, pointhover radius added.
  const options = {
            responsive: true,
            plugins: {
            legend: {
                      position: 'top',   //position of data about datasets
            },
            title: {
                      display: true,
                      text: 'Chart.js point styling Line Chart',   //title of chart
            },
            datalabels:{
                      display: false
            }
            },
            scales:{
              x:{
                    display: true,
                    title: {
                        display: true,
                        text: "Days",
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
      },
  }
  const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
  const data = {
            labels,
            datasets: [
                    {
                    label: 'Dataset 1',
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointStyle:'circle',
                    pointRadius:10,
                    pointHoverRadius: 15
                    },
                    {
                    label: 'Dataset 2',
                    borderColor: 'rgb(53, 162, 235)',
                    data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    pointStyle:'cross',
                    pointRadius:10,
                    pointHoverRadius: 15
                    }
                
            ],
    };
const PointStylingLineChart =()=>{
  return(
    <>
         <Line
                 data={data}
                 options={options}
             />
    </> 
    )
}
export default PointStylingLineChart