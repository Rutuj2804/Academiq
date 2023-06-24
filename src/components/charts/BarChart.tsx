import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const BarChart = () => {
    const options: ApexOptions = {
        chart: {
            type: "bar",
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        series: [
            {
                data: [
                    {
                        x: "category A",
                        y: 10,
                    },
                    {
                        x: "category B",
                        y: 18,
                    },
                    {
                        x: "category C",
                        y: 13,
                    },
                ],
            },
        ],
    };

    const series = [
        {
            data: [
                {
                    x: "category A",
                    y: 10,
                },
                {
                    x: "category B",
                    y: 18,
                },
                {
                    x: "category C",
                    y: 13,
                },
                {
                    x: "category A",
                    y: 10,
                },
                {
                    x: "category B",
                    y: 18,
                },
                {
                    x: "category C",
                    y: 13,
                },
                {
                    x: "category A",
                    y: 10,
                },
                {
                    x: "category B",
                    y: 18,
                },
                {
                    x: "category C",
                    y: 13,
                },
            ],
        },
    ]

    return (
        <div>
            <Chart options={options} series={series} type="bar" />
        </div>
    );
};

export default BarChart;
