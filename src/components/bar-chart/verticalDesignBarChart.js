import React from 'react'
import {Bar} from 'react-chartjs-2'
import faker from 'faker';
import { Chart, registerables  } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'
  Chart.register(...registerables);
  Chart.register(ChartDataLabels);

 const VerticalDesignBarChart = ()=>{

    const labels=["Government","Non-Profit","Foundation","Consulting","Other"]
    const data={
                labels,
                datasets:[
                            {
                                label:"Datasets 1",
                                data:[
                                        {id:1,nested:{value:400}},
                                        {id:2,nested:{value:550}},
                                        {id:3,nested:{value:300}},
                                        {id:4,nested:{value:200}},
                                        {id:5,nested:{value:100}}
                                     ],
                                backgroundColor:'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgb(255,99,132)',
                                borderWidth:2,
                                // borderSkipped: 'top',
                                barPercentage:0.4,
                                minBarLength: 2,
                                borderRadius: 9
                                //   maxBarThickness: 8,
                                //   barThickness: 6
                            },
                            {
                                label:"Datasets 2",
                                data:[
                                        {id:1,nested:{value:400}},
                                        {id:2,nested:{value:650}},
                                        {id:3,nested:{value:250}},
                                        {id:4,nested:{value:150}},
                                        {id:5,nested:{value:80}}
                                     ],
                                backgroundColor:'rgba(53, 162, 235, 0.5)',
                                borderColor: 'rgb(53, 162, 235)',
                                borderWidth:2,
                                // borderSkipped: 'top',
                                barPercentage:0.4,
                                minBarLength: 2,
                                borderRadius: 9
                                //   maxBarThickness: 8,
                                //   barThickness: 6
                            }
                         ]
               }
    const options={
                    parsing:{
                            xAxisKey: 'id',
                            yAxisKey: 'nested.value'
                    },
                    //indexAxis: 'y',
                    type: 'bar',
                    responsive: true,
                    plugins:{
                                legend: {
                                        position: 'left',        // position of data about datasets
                                },
                                title:{
                                        display: true,           //chart title
                                        text: "Chart"
                                },
                                datalabels:{
                                    display: false,
                                    color:"red"                //bar values
                                }
                    },
                    scales:{
                                x:{
                                    display: true,
                                    title: {
                                        display: true,
                                        text: "Organization",
                                        color: 'red'
                                    },
                                    grid: {
                                        display: false
                                      }
                                },
                                y:{
                                    
                                    display: true,
                                    title: {
                                        display: true,
                                        text: "Value",
                                        color: 'red'
                                    },
                                    grid: {
                                        display: false
                                      }
                                }
                    },
        }
    return (
          <>
             <Bar
                  maintainAspectRatio={false}
                  data={data}
                  options={options} 
             />
          </>
    )
}
export default VerticalDesignBarChart