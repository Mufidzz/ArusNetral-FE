import React from "react";
import {DatePicker, MainAppBar, Page} from "components";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import LogTable from "../../tables/LogTable";
import {DashboardChart} from "../../charts";

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
                        <DatePicker/>
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
                                    <DashboardChart color={"#1F90B4"}/>
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
                                    <DashboardChart color={"#B4AF1F"}/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <LogTable/>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )

}

export default LogPage