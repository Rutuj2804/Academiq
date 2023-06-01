import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart = () => {
    const options: ApexOptions = {
        series: [44, 55, 13, 43, 22],
        chart: {
            width: 380,
            type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    const series = [44, 55, 13, 43, 22];

    return (
        <div>
            <Chart options={options} series={series} type="pie" />
        </div>
    );
};

export default PieChart;
