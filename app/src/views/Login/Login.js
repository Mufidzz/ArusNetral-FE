import React, {useState} from "react";
import {Page} from "components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useHistory} from "react-router-dom"

const Login = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        Username : "",
        Password : ""
    })

    const handleFormChange = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleLoginClick = () => {
        fetch("http://api.arusnetral.my.id/user/"+ formData.Username + "/" + formData.Password, {
            method: "AUTH"
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                return null;
            }
        }).then(resJSON => {
            console.log(resJSON)
            if (resJSON !== null && resJSON !== undefined) {
                localStorage.setItem("AUTH", resJSON["data"]["Password"]);
                history.replace("/");
            } else {
                alert("Password Salah");
            }
        })
    }

    return(
        <Page title={"Arus Netral - Login"}>
            <Grid container justify='center' alignContent="center" alignItems="center" style={{height: "100vh"}}>
                <Grid item container md={6} xs={11}>
                    <Grid item md={12} xs={12} style={{backgroundColor: "#303030", color: "#FFFFFF", padding: "16px 40px"}}>
                        <Typography variant={"h2"} align={"left"}> <b> Login </b></Typography>
                        <Typography variant={"body2"} align={"left"}> <b> Silahkan Login Untuk Melanjutkan </b></Typography>
                    </Grid>

                    <Grid item container md={12} xs={12} style={{ height: '300px', border: "solid 2px #303030",}} >

                        <Grid item container md={6} xs={12} justify='center' alignContent="center" alignItems="center">
                            <Grid item container spacing={2} md={12} xs={12} justify='center' alignContent="center" alignItems="center">
                                <Grid item md={10} xs={10}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="Username"
                                        onChange={handleFormChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item md={10} xs={10}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="Password"
                                        onChange={handleFormChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>


                            <Grid item md={10} xs={10} style={{marginTop: "50px"}}>
                                <Button onClick={handleLoginClick} fullWidth variant="contained" color={'primary'}>Login</Button>
                            </Grid>
                        </Grid>

                        <Grid item container md={6} xs={12} justify='center' alignContent="center" alignItems="center">
                            <Typography variant={"caption"} style={{width: '100%'}} align={"center"}> ArusNetral adalah ...</Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}

export default Login;