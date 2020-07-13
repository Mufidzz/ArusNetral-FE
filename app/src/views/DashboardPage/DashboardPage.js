import React from "react";
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

    return (
        <Page title={"Arus Netral"}>
            <MainAppBar/>
            <Grid container justify='center' alignContent="center" alignItems="center">
                <Grid item container md={12} xs={12} className={classes.titleContainer}>
                    <Grid item md={6} xs={12}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography}> <b> Analytics </b> </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography} align={"right"}> Thu, 14 March 2000 </Typography>
                    </Grid>
                </Grid>

                <Grid item container md={12} xs={12} className={classes.chartContainer}>
                    <Grid item container spacing={1} md={12} xs={12} justify='flex-end' alignContent="center" alignItems="center">
                        <Grid item md={2} xs={6}>
                            <RoundedButton fullWidth>
                                Tegangan
                            </RoundedButton>
                        </Grid>
                        <Grid item md={2} xs={6}>
                            <RoundedButton variant={"outlined"} fullWidth>
                                Arus
                            </RoundedButton>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12} className={classes.chart}>
                        <DashboardChart color={"#DEA917"}/>
                    </Grid>
                </Grid>

                <Grid item container md={12} xs={12} className={classes.cardContainer} >
                    <Grid item container justify='center' alignContent="center" alignItems="center" md={6} xs={12} className={clsx(classes.card, classes.cardBorder)}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography} align={"center"} style={{color: "#1F90B4"}}> Tegangan </Typography>
                        <Typography variant={"h2"} className={classes.fullWidthTypography} align={"center"}> 999V</Typography>
                        <img height={'15%'} src={chartBlue} alt={"Blue Chart"}/>
                    </Grid>
                    <Grid item container justify='center' alignContent="center" alignItems="center" md={6} xs={12} className={classes.card}>
                        <Typography variant={"h6"} className={classes.fullWidthTypography} align={"center"} style={{color: "#B4AF1F"}}> Arus </Typography>
                        <Typography variant={"h2"} className={classes.fullWidthTypography} align={"center"}> 999A</Typography>
                        <img height={'15%'} src={chartYellow} alt={"Yellow Chart"}/>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}

export default DashboardPage;