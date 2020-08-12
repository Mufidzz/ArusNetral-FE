import React, {useEffect, useMemo, useState} from "react";
import {DatePicker, MainAppBar, Page} from "components";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import LogTable from "../../tables/LogTable";
import {DashboardChart} from "../../charts";
import {useHistory} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    },
    titleContainer: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    chartContainer: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: "#F5F5F5",
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    },
    chart: {
        height: "40vh",
        [theme.breakpoints.down('sm')]: {
            height: "20vh"
        },

    },
    chartSpacer: {
        height: theme.spacing(1),
    },
    fullWidthTypography: {
        width: "100%"
    }
}));

const LogPage = () => {
    const classes = useStyles();
    const history = useHistory();

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [logData, setLogData] = React.useState([]);
    const [vData, setVData] = useState([])
    const [cData, setCData] = useState([])
    useEffect( () => {
        let unmounted = false;

        if(!unmounted) {
            fetch("http://api.arusnetral.my.id/log/filter/date/"+ selectedDate.getFullYear() + "-" + (selectedDate.getMonth()+1) + "-" + selectedDate.getDate() +"/hourly", {
                method: "GET"
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(resJSON => {
                setLogData(resJSON["data"]);
                resJSON["data"].length > 0 ? buildChartData(resJSON["data"]) : buildChartData([{
                    Hour: 1,
                    AVGV: 0,
                    AVGC: 0
                }]);
            })
        }
        return () => {unmounted = true}
    }, [selectedDate])

    useMemo(() => {
        const ld = localStorage.getItem("AUTH");
        if(ld === null || ld === undefined) {
            history.replace("/login")
        }
    }, []);

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
            <Grid container justify='center' alignContent="center" alignItems="center"
                  className={classes.mainContainer}>
                <Grid item container md={12} xs={12} className={classes.titleContainer}>
                    <Grid item md={6} xs={12}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography}> <b> Logger </b>
                        </Typography>
                    </Grid>
                    <Grid item container md={6} xs={12} justify='flex-end' alignContent="center" alignItems="center">
                        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                    </Grid>
                </Grid>
                <Grid item container md={12} xs={12} className={classes.titleContainer} spacing={2} direction={"row-reverse"}>
                    <Grid item container md={6} xs={12} spacing={1} justify='flex-start' alignContent="flex-start" alignItems="flex-start">
                        <Grid item container md={12}>
                            <Grid item md={12} xs={12} className={classes.chartContainer}>
                                <Typography variant={"h6"} className={classes.fullWidthTypography} align={"left"}
                                            style={{color: "#1F90B4"}}> <b> Tegangan </b> </Typography>
                            </Grid>
                            <Grid item md={12} xs={12} className={classes.chartContainer}>
                                <div className={classes.chart}>
                                    <DashboardChart vData={vData} cData={cData} dataType={"v"} color={"#1F90B4"}/>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid item md={12} className={classes.chartSpacer}>

                        </Grid>

                        <Grid item container md={12}>
                            <Grid item md={12} xs={12} className={classes.chartContainer}>
                                <Typography variant={"h6"} className={classes.fullWidthTypography} align={"left"}
                                            style={{color: "#B4AF1F"}}> <b> Arus </b> </Typography>
                            </Grid>
                            <Grid item md={12} xs={12} className={classes.chartContainer}>
                                <div className={classes.chart}>
                                    <DashboardChart vData={vData} cData={cData} dataType={"c"} color={"#B4AF1F"}/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <LogTable data={logData}/>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )

}

export default LogPage