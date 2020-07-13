import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AvTimerIcon from '@material-ui/icons/AvTimer';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));


const drawer = (
    <List>
        <ListItem component={Link} button key={"Pembacaan"} to='/'>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>
            <ListItemText primary={"Pembacaan"} />
        </ListItem>
        <ListItem component={Link} button key={"Logger"} to='/log'>
            <ListItemIcon><HistoryIcon/></ListItemIcon>
            <ListItemText primary={"Logger"} />
        </ListItem>
        <Divider/>
        <ListItem component={Link} button key={"Logout"} to='/login'>
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary={"Logout"} />
        </ListItem>
    </List>
);

const MainAppBarDrawer = () => {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = (value) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(value);
    };

    return (
        <React.Fragment key={'left'}>
            <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={'left'}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className={classes.list}>
                    {drawer}
                </div>

            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default MainAppBarDrawer;