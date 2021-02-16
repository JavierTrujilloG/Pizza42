import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import {
    InputLabel,
    TextField,
    MenuItem,
    Typography,
    Button,
    Stepper,
    Paper,
    Step,
    StepLabel,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
    Box
} from '@material-ui/core';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import { OrderContext } from '../contexts';
import { PizzaService } from '../services';
import { useHistory } from "react-router-dom";
import { CustomBreadCrumb } from '../components';
import { AppStyles } from '../config/themes';
import CONSTANTS from "../config/constants";
import { getConfig } from "../config.js";
const config = getConfig();

const { Pizzas } = CONSTANTS;

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const CustomerDetailsForm = ({ user, newAddress, setNewAddress }) => {
    const STYLES = AppStyles();
    return (
        <form>
            <TextField
                value={user.email}
                label="Email"
                variant="outlined"
                margin="normal"
                disabled
                fullWidth
                id="user-email"
                name="email"
                autoComplete="email"
            />
            <TextField
                value={newAddress}
                onInput={(e) => setNewAddress(e.target.value)}
                variant="outlined"
                label="Address"
                margin="normal"
                required
                fullWidth
                id="user-address"
                name="address"
                autoComplete="address"
                autoFocus
            />
        </form>
    );

};

// Same as create account
const LoginBox = ({ loginWithRedirect }) => {
    const classes = useStyles();
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => loginWithRedirect()}
                className={classes.button}
            >
                Login
            </Button>
        </>
    );
};

const steps = ['Order details', 'Customer Information', 'Order Completed!'];

export default function Checkout({location, match }) {
    const classes = useStyles();
    const STYLES = AppStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [newOrderId, setNewOrderId] = useState(null);
    const [APIerror, setAPIError] = useState(null);
    const { currentOrder, resetCurrentOrder } = useContext(OrderContext);
    const history = useHistory();

    const consentRequired = APIerror === "consent_required";
    const consentAndLoginRequired = APIerror === "login_required";

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        getAccessTokenSilently,
        loginWithPopup,
        getAccessTokenWithPopup
    } = useAuth0();

    // Enrich user profile with address information
    const [newAddress, setNewAddress] = useState((user && user.address));
    const nextBtnDisabled = activeStep === 1 && !(newAddress && newAddress !== '');

    const emailVerified = true;

    const accessTokenOptions = {
        audience: config.audience,
        scope: 'create:order',
    };
    const createOrder = async () => {
        let res = true;
        try {
            const token = await getAccessTokenSilently(accessTokenOptions);
            const orderRes = await PizzaService.createOrder({ order: currentOrder, address: newAddress }, token);
            if (!orderRes || !orderRes.success) {
                alert(orderRes.error);
                res = false;
            }
            setNewOrderId(orderRes.orderId);
            resetCurrentOrder([]);
        } catch(error) {
            setAPIError(error.error);
            res = false;
        }
        return res;
    }

    const handleConsent = async () => {
        try {
            await getAccessTokenWithPopup(accessTokenOptions);
            setAPIError(null);
        } catch (error) {
            setAPIError(error.error);
        }
    };

    const handleLoginAgain = async () => {
        try {
            await loginWithPopup();
            setAPIError(null);
        } catch (error) {
            setAPIError(error.error);
        }
    };

    const goNextStep = async () => {
        if(activeStep === 1) {
            if (!isAuthenticated) {
                // Unlikely this occurs
                await loginWithRedirect();
            }

            // Check that the user has email address verified. This is always going to be the case
            // using Google as social identity provider
            if (!user.email_verified) {
                setShowVerifyModal(true);
                return;
            }
            
            const res = await createOrder();
            console.log(res);
            if (!res) {
                return;
            }
        }
        setActiveStep(activeStep + 1);
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Your order 
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {currentOrder && currentOrder.length > 0 ? (
                                    <List>
                                        {currentOrder.map((pizzaId) => (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <LocalPizzaIcon style={{ color: "#3083ff" }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={Pizzas.find(pizza => pizza.id === pizzaId).name}
                                                />

                                                </ListItem>
                                        ))}
                                    </List>
                                )
                                :
                                (
                                    <Typography variant="body1" gutterBottom>
                                        Order empty
                                    </Typography>
                                )
                                }
                            </Grid>
                        </Grid>
                    </>
                );
            case 1:
                return (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Customer information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {isAuthenticated ?
                                    <CustomerDetailsForm user={user} setNewAddress={setNewAddress}/>
                                    :
                                    <LoginBox loginWithRedirect={loginWithRedirect}/>
                                }
                            </Grid>
                        </Grid>
                    </>
                );
            case 2: 
               return (
                <>
                        <Typography variant="h6" gutterBottom>
                            Order Completed
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography> Congratulations! You'll receive your order in 30 min. </Typography>
                                <br/>
                                <Typography> This is your order ID: <Box fontWeight="fontWeightBold" style={{display: 'inline'}}> {`${newOrderId}`}  </Box> </Typography>
                                <br/>
                                <Typography> You can view all your orders on your profile page </Typography>
                                <Button
                                    onClick={() => history.push('/profile')}
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                >
                                    See orders
                                </Button>
                            </Grid>
                        </Grid>
                </>
               );
            default:
                break;
        }
    };
    
    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                            {activeStep === 0 ? (
                                <Button
                                    onClick={() => history.push('/home')}
                                    className={classes.button}
                                >
                                    Edit my Order
                                </Button>
                            )
                                :
                            (activeStep !== steps.length -1 &&
                                <Button
                                    onClick={() => setActiveStep(activeStep - 1)}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                            )}
                            {currentOrder && currentOrder.length > 0 && activeStep < steps.length  &&
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={goNextStep}
                                    className={classes.button}
                                    disabled={nextBtnDisabled}
                                >
                                    Next
                                </Button>
                            }
                        </div>
                    </>
                </Paper>
                {/* EMAIL VERIFICATION DIALOG */}
                <Dialog open={showVerifyModal} onClose={() => setShowVerifyModal(false)}>
                    <DialogTitle>Email verification required</DialogTitle>
                    <DialogContent>
                        <>
                            <Typography>Almost there! We kindly ask you to verify your email address before you can order your pizzas. </Typography>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => setShowVerifyModal(false)}>
                            Sure!
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* CONSENT DIALOG */}
                <Dialog open={consentRequired} onClose={() => setAPIError(null)}>
                    <DialogTitle>Consent required</DialogTitle>
                    <DialogContent>
                        <>
                            <Typography> You need to consent access to access the order API</Typography>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConsent}>OK</Button>
                    </DialogActions>
                </Dialog>
                {/* CONSENT AND LOGIN DIALOG */}
                <Dialog open={consentAndLoginRequired} onClose={() => setAPIError(null)}>
                    <DialogTitle>Consent & Login required</DialogTitle>
                    <DialogContent>
                        <>
                            <Typography> You need to login and consent access to access the order API</Typography>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoginAgain}>OK</Button>
                    </DialogActions>
                </Dialog>
            </main>
        </>
    );
}

