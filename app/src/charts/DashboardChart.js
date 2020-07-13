import React, {Fragment} from "react";
import {Line} from "react-chartjs-2";

const DashboardChart = props => {
    const {color, ...rest} = props

    const data = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
            {
                fill: false,
                lineTension: 0.5,
                borderWidth: 5,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: props.color,
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#000000',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#000000',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: ['190', '64', '76', '22', '14', '85', '26', '244', '8', '9', '10', '11', '12', '223', '14', '15', '323', '17', '18', '19', '20', '21', '22', '23'],
            }
        ]
    }

    const options = {
        bezierCurve: true,
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                display: false,
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        },
        legend: {
            display: false
        },
    }

    return (
        <Fragment>
            <Line height={'50vh'}  options={options}  data={data}/>
        </Fragment>
    )
}

export default DashboardChart;