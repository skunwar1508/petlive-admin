import React from 'react';
import  {
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
  
  const labels=["January", "February", "March", "April", "May", "June", "July"]
  const data={
                labels,
                datasets:[
                            {
                                    label: "DataSet 1",
                                    data: labels.map(()=>faker.datatype.number({min: -1000, max:1000})),
                                    backgroundColor:'rgba(255, 99, 132, 0.5)',
                                    borderColor: 'rgb(255,99,132)',
                                    borderRadius:{
                                        topLeft:9,
                                        topRight:9,
                                        bottomLeft:9,
                                        bottomRight:9
                                    },
                                    borderSkipped: false,
                                    borderWidth: 1,
                                    // datalabels:{
                                    //     display: true,
                                    //     anchor: 'end',
                                    //     align: 'top'
                                    //   }
                                   
                            },
                            {
                                    label: "DataSet 2",
                                    data: labels.map(()=>faker.datatype.number({min: -1000, max:1000})),
                                    backgroundColor:'rgba(53, 162, 235, 0.5)',
                                    borderColor: 'rgb(53, 162, 235)',
                                    borderRadius:{
                                        topLeft:9,
                                        topRight:9,
                                        bottomLeft:9,
                                        bottomRight:9
                                    },
                                    borderSkipped: false,
                                    borderWidth: 1,
                                    // datalabels:{
                                    //     display: true,
                                    //     anchor: 'end',
                                    //     align: 'top'
                                    //   }
                                   
                            },
                            {
                                    label: "DataSet 3",
                                    data: labels.map(()=>faker.datatype.number({min: -1000, max:1000})),
                                    backgroundColor:'rgba(99, 255, 132, 0.5)',
                                    borderColor: 'rgb(99,255,132)',
                                    borderRadius:{
                                        topLeft:9,
                                        topRight:9,
                                        bottomLeft:9,
                                        bottomRight:9
                                    },
                                    borderSkipped: false,
                                    borderWidth: 1,
                                    // datalabels:{
                                    //     display: true,
                                    //     anchor: 'end',
                                    //     align: 'top'
                                    //   }
                                   
                            }
            ]
  }
  const options={
                   plugins:{
                                responsive: true,
                                legend:{
                                        position: 'top'
                                },
                                title:{
                                    display: true,
                                    text:"Stacked Fully Rounded Bar"
                                },
                                datalabels:{
                                    display: false,

                                }
                            },
                            scales:{
                                    x:{
                                        stacked: true,
                                        display: true,
                                        title: {
                                            display: true,
                                            text: "Month",
                                            color: 'red'
                                        }
                                    },
                                    y:{
                                        stacked: true,
                                        display: true,
                                        title: {
                                            display: true,
                                            text: "Value",
                                            color: 'red'
                                        }
                                    }
                            },
                  
  }

const StackedBarChart = ()=>{
 
    return(
        <>
                    <Bar
                        data={data}
                        options={options}
                    />
        </>
    )
}
export default StackedBarChart
