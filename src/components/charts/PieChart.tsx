import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart = () => {
    const options: ApexOptions = {
        series: [23, 77],
        colors: ["rgb(239, 68, 68)", "rgb(34, 197, 94)"],
        chart: {
            width: 380,
            type: "pie",
        },
        labels: ["Absent" ,"Present"],
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

    const series = [23, 77];

    return (
        <div>
            <Chart options={options} series={series} type="pie" />
        </div>
    );
};

export default PieChart;
