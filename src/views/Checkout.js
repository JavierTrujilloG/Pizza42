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
    DialogActions
} from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../contexts';
import { PizzaService } from '../services';
import { CustomBreadCrumb } from '../components';
import { AppStyles } from '../config/themes';
import { getConfig } from "../config.js";
const config = getConfig();


// import { useAuth0 } from "@auth0/auth0-react"; 

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


// TODO add preferences: Extra cheesy, Big groot, Cutted
const CustomerDetailsForm = ({ user }) => {
    const STYLES = AppStyles();
    const [email, setEmail] = useState(user.email); // TODO this wil probably need to go up
    const [address, setAddress] = useState(user.address);
    console.log('EEE', user);
    return (
        <>
            <InputLabel htmlFor="email" className={[STYLES.textWhite]}>Email</InputLabel>
            <TextField
                value={user.email}
                onInput={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user-email"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <InputLabel htmlFor="address" className={[STYLES.textWhite]}>Address</InputLabel>
            <TextField
                value={address}
                onInput={(e) => setAddress(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user-address"
                name="address"
                autoComplete="address"
                autoFocus
            />
        </>
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
    const [APIerror, setAPIError] = useState(null);
    const { currentOrder, setCurrentOrder } = useContext(AuthContext);

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

    console.log(isAuthenticated, user);
    const emailVerified = true;

    const resendVerificationEmail = async () => {
        // This will only be need for users logged via Database connection
        // TODO await PizzaService.resendEmail(currentOrder, token);
    };
    const accessTokenOptions = {
                audience: config.audience,
                scope: 'create:order',
            };
    const createOrder = async () => {
        let res = true;
        try {
            const token = await getAccessTokenSilently(accessTokenOptions);
            await PizzaService.createOrder(currentOrder, token);
        } catch(error) {
            setAPIError(error.error);
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
            // TODO Check both fields are entered
            

            // Before proceeding to create order we need to double check we have the appropiate access token
            if (!isAuthenticated) {
                // Unlikely this occurs
                await loginWithRedirect();
            }
            if (!user.email_verified) {
                setShowVerifyModal(true);
                return;
            }
            // Progressive Profiling: check if we can enrich user profile with new infor
            // If user.address !== newAddress ...

            /* TODO do we need consent first?
            const {
                getAccessTokenSilently
              } = useAuth0();
              */
            const token = 'dummy';//await getAccessTokenSilently();
            
            const res = await createOrder();
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
                            <Grid item xs={12} sm={6}>
                                {currentOrder}
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
                            <Grid item xs={12} sm={6}>
                                {isAuthenticated ?
                                    <CustomerDetailsForm user={user}/>
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
                            <Grid item xs={12} sm={6}>
                                <Typography> Sit and relax! You'll receive your order in 30 min </Typography>
                                <Typography> If you would like to view your orders click here </Typography>
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
                <CustomBreadCrumb id="Profile"/>
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
                        {activeStep === steps.length - 1 ? (
                            <>
                                <Button>
                                    Thanks!
                                </Button>
                            </>

                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={() => setActiveStep(activeStep - 1)}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={goNextStep}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Thanks' : 'Next'}
                                    </Button>
                                </div>
                            </>
                        )
                        }
                    </>
                </Paper>
                {/* EMAIL VERIFICATION DIALOG */}
                <Dialog open={showVerifyModal} onClose={() => setShowVerifyModal(false)}>
                    <DialogTitle>Email verification required</DialogTitle>
                    <DialogContent>
                        <>
                            <Typography>Almost there! We kindly ask you to verify your email address before you can order your pizzas. </Typography>
                            <Typography>If you don't find the verification email we can resend it to you </Typography>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={resendVerificationEmail}>Please resend</Button>
                        <Button color="primary" onClick={() => setShowVerifyModal(false)}>
                            I got it
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

