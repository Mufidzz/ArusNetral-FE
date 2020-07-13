import React from "react";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const CustomButton = withStyles((theme) => ({
    root: {
        color: theme.palette.white,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 999999,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}))(Button);

const CustomOutlinedButton = withStyles((theme) => ({
    root: {
        color: theme.palette.black,
        backgroundColor: null,
        borderRadius: 999999,
        border: "solid 2px",
        borderColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}))(Button);


const RoundedButton = props => {
    const {variant, ...rest} = props;

    switch (variant) {
        case "outlined":
            return <CustomOutlinedButton {...rest}/>;
        case "filled" :
            return <CustomButton {...rest}/>;
        default:
            return <CustomButton {...rest}/>;
    }
}

export default RoundedButton;