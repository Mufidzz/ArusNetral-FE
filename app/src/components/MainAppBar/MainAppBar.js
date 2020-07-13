import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MainAppBarDrawer from "./components/MainAppBarDrawer";
import mainLogo from "assets/img/main-logo.png"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const MainAppBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="static" color={"primary"}>
            <Toolbar>
                <MainAppBarDrawer/>
                <img src={mainLogo} alt="Main Logo" height={"18px"}/>
                <div className={classes.root}/>
                <Button color="inherit">Hi, LoginName</Button>
            </Toolbar>
        </AppBar>
    )
}

export default MainAppBar;