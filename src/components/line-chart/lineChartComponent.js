import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import common from "../../services/common";
import authAxios from "../../services/authAxios";

const LineChart = ({ data }) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const [resData, setResData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Earnings",
                data: [],
                borderColor: "#D5AD33",
                backgroundColor: "#ab6d23",
            },
        ],
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
            
                        if (label) {
                        label += ': ';
                        }
                        if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            },

        },
        
        
    };

    function getMonths() {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let today = new Date();
        let d;
        let month = [];

        for (var i = 6; i > 0; i -= 1) {
            d = new Date(today.getFullYear(), today.getMonth() - (i - 1), 1);
            // console.log(d);
            month.push(monthNames[d.getMonth()]);
        }
        return month;
    }

    async function getData() {
        common.loader(true);
        await authAxios({
            method: "GET",
            url: `/dashboard/graph`,
        })
            .then((res) => {
                let resData = res?.data?.data;
                setResData(resData || []);
                let cData = chartData;
                cData.labels = getMonths();
                let datasets = [];
                datasets.push(resData?.monthSixTotal || 0);
                datasets.push(resData?.monthFiveTotal || 0);
                datasets.push(resData?.monthFourTotal || 0);
                datasets.push(resData?.monthThreeTotal || 0);
                datasets.push(resData?.monthTwoTotal || 0);
                datasets.push(resData?.monthOneTotal || 0);

                cData.datasets[0].data = datasets;

                setChartData(cData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // common.error(error)
            });
        common.loader(false);
    }
    function getChartData(resData) {
        let cData = chartData;
        cData.labels = getMonths();
        let datasets = resData?.map((d) => d.totalAmount).reverse();

        cData.datasets[0].data = datasets;

        setChartData(cData);
        setIsLoading(false);
    }
    useEffect(() => {
        if (data?.length > 0) {
            getChartData(data);
        }
        //  getData();
    }, [data]);
    console.log(data);

    return <>{isLoading ? "Loading" : <Line options={options} data={chartData} />}</>;
};
export default LineChart;
