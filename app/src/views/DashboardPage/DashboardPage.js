import React, {useEffect, useMemo, useState} from "react";
import {MainAppBar, Page} from "components";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {DashboardChart} from "../../charts";
import clsx from 'clsx'

import chartBlue from "assets/img/chart-blue.png"
import chartYellow from "assets/img/chart-yellow.png"
import Button from "@material-ui/core/Button";
import RoundedButton from "../../components/RoundedButton";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        paddingLeft : theme.spacing(5),
        paddingRight : theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    cardContainer: {
        paddingLeft : theme.spacing(5),
        paddingRight : theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    card: {
        height: "200px"
    },
    cardBorder: {
        borderRight: "solid 1px #cccccc",
        [theme.breakpoints.down('sm')]: {
            borderRight: "solid 0px #cccccc",
        },
    },
    fullWidthTypography: {
        width: "100%"
    },
    chartContainer: {
        paddingLeft : theme.spacing(5),
        paddingRight : theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: "#F5F5F5",
        [theme.breakpoints.down('sm')]: {
            paddingLeft : theme.spacing(1),
            paddingRight : theme.spacing(1),
        },
    },
    chart: {
        height: "50vh"
    }
}));

const DashboardPage = () => {
    const classes = useStyles();
    const history = useHistory();

    const [apiData, setApiData] = useState({})
    const [vData, setVData] = useState([])
    const [cData, setCData] = useState([])
    const [chartDataType, setChartDataType] = useState("v")
    const [count, setCount] = React.useState(0);
    const [date, setDate] = useState("");

    const tick = () => {
        setCount((prevState) => prevState < 60 ? prevState +1 : 0);
    }

    useMemo(() => {
        const ld = localStorage.getItem("AUTH");
        if(ld === null || ld === undefined) {
            history.replace("/login")
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => tick(), 1);
        return () => clearInterval(timer);
    })

    React.useEffect(() => {
        if (count === 0) {
            const rawDate = new Date();
            const date = rawDate.getDate() + "-" + (rawDate.getMonth()+1) + "-" + rawDate.getFullYear() ;
            setDate(date);

            fetch("http://api.arusnetral.my.id/log/", {
                method: "LAST"
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(resJSON => {
                const dateNow = new Date();
                const lastReadedDate = new Date(resJSON["data"]["CreatedAt"]);

                if((dateNow.getTime() - 2 * 60 * 1000 ) > lastReadedDate) {
                    setApiData({
                        "Voltage": "N/A",
                        "Current": "N/A"
                    });
                } else {
                    setApiData(resJSON["data"]);
                }
            })


            fetch("http://api.arusnetral.my.id/log/filter/date/"+ rawDate.getFullYear() + "-" + (rawDate.getMonth()+1) + "-" + rawDate.getDate() +"/hourly", {
                method: "GET"
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(resJSON => {
                resJSON["data"].length > 0 ? buildChartData(resJSON["data"]) : buildChartData([{
                    Hour: 1,
                    AVGV: 0,
                    AVGC: 0
                }]);
            })
        }
    },[count]);

    const buildChartData = (data) => {
        let tempVData = [];
        let tempCData = [];
        const tempDataLen = 24;
        let inDataPtr = 0;

        for(let i = 0; i < tempDataLen; i++) {
            if(data[inDataPtr]["Hour"] === i) {
                tempVData.push(data[inDataPtr]["AVGV"]);
                tempCData.push(data[inDataPtr]["AVGC"]);
                console.log(data.length-1);
                inDataPtr = inDataPtr < data.length-1 ? inDataPtr + 1 : data.length-1;
            }else{
                tempVData.push(0);
                tempCData.push(0);
            }
        }

        setVData(tempVData);
        setCData(tempCData);
    }

    return (
        <Page title={"Arus Netral"}>
            <MainAppBar/>
            <Grid container justify='center' alignContent="center" alignItems="center">
                <Grid item container md={12} xs={12} className={classes.titleContainer}>

                    <Grid item md={6} xs={12}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography}> <b> Analytics </b> </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography} align={"right"}> Current Date : {date} </Typography>
                    </Grid>
                </Grid>

                <Grid item container md={12} xs={12} className={classes.chartContainer}>
                    <Grid item container spacing={1} md={12} xs={12} justify='flex-end' alignContent="center" alignItems="center">
                        <Grid item md={2} xs={6}>
                            <RoundedButton variant={chartDataType !== "v" ? "outlined" : ""} fullWidth onClick={() => {setChartDataType("v")}}>
                                Tegangan
                            </RoundedButton>
                        </Grid>
                        <Grid item md={2} xs={6}>
                            <RoundedButton variant={chartDataType !== "c" ? "outlined" : ""} fullWidth onClick={() => {setChartDataType("c")}}>
                                Arus
                            </RoundedButton>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12} className={classes.chart}>
                        <DashboardChart vData={vData} cData={cData} dataType={chartDataType} color={chartDataType === "v" ? "#1F90B4" : "#DEA917"}/>
                    </Grid>
                </Grid>

                <Grid item container md={12} xs={12} className={classes.cardContainer} >
                    <Grid item container justify='center' alignContent="center" alignItems="center" md={6} xs={12} className={clsx(classes.card, classes.cardBorder)}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography} align={"center"} style={{color: "#1F90B4"}}> Tegangan </Typography>
                        <Typography variant={"h2"} className={classes.fullWidthTypography} align={"center"}> {apiData["Voltage"]} V</Typography>
                        <img height={'15%'} src={chartBlue} alt={"Blue Chart"}/>
                    </Grid>
                    <Grid item container justify='center' alignContent="center" alignItems="center" md={6} xs={12} className={classes.card}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography} align={"center"} style={{color: parseInt(apiData["Current"]) > 0.5 ? "#B80F0A" : "#B4AF1F"}}> Arus </Typography>
                        <Typography variant={"h2"} className={classes.fullWidthTypography} align={"center"} style={{color: parseInt(apiData["Current"]) > 0.5 ? "#B80F0A" : "inherit"}}> {apiData["Current"]} A</Typography>
                        <img height={'15%'} src={chartYellow} alt={"Yellow Chart"}/>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}

export default DashboardPage;