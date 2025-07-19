import React from 'react';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

    const HorizontalBarChart =()=>{
        const labels=['January', 'February', 'March', 'April','May','June','july'];
        const options = {
                        indexAxis:'y',
                        responsive: true,
                        plugins: {
                        legend: {
                            position: 'right',
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
                                    text: "Value",
                                    color: 'red'
                                }
                          },
                          y:{
                                display: true,
                                title: {
                                    display: true,
                                    text: "Month",
                                    color: 'red'
                                }
                          }
                        }
          }
        const data={
                      labels,
                      datasets:[
                          {
                              label: "Dataset 1",
                              data: labels.map(()=>faker.datatype.number({ min: -1000, max: 1000 })),
                              backgroundColor:'rgba(255, 99, 132, 0.5)',
                              borderColor: 'rgb(255,99,132)',
                              
                              

                          },
                          {
                              label: "Dataset 2",
                              data: labels.map(()=>faker.datatype.number({ min: -1000, max: 1000  })),
                              backgroundColor:'rgba(53, 162, 235, 0.5)',
                              borderColor: 'rgb(53, 162, 235)',
                             
                          },
                      ]
        }

        return (
            <>
                      <Bar
                          data={data}
                          options={options}
                      />
                      
            </>
        )
    }
 export default HorizontalBarChart