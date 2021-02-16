import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import {
    Typography,
    Container,
    Grid,
    ListItemText,
    InputLabel,
    TextField,
    Paper,
    Tabs,
    Tab,
    Box,
    Button,
    List, 
    ListItem,
    IconButton,
    Link,
    Tooltip
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { PizzaService } from '../services';
import { CustomBreadCrumb } from '../components';
import { AppStyles, ThemeColors } from '../config/themes';
import { getConfig } from "../config.js";
const config = getConfig();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    tabPanel: {
        backgroundColor: ThemeColors.softGrey,
        overflowY: 'scroll'
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        className={classes.tabPanel}
        {...other}
        >
            {value === index && children}
        </div>
    );
};

const MyTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
    },
    selected: {},
}))((props) => <Tab {...props} />);

const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
};


// --------------------------------------------------------------------
// MAIN COMPONENT
const Profile = ({location, match }) => {
    const STYLES = AppStyles();
    const classes = useStyles();
    const { user, getAccessTokenSilently } = useAuth0();
    const history = useHistory();
    console.log(user);
    const [currentTab, setCurrentTab] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const orders = user[config['custom_claim']];

    /*
    const updateProfileInfo = async () => {
        const token = 'dummy';//await getAccessTokenSilently();
        try {
            await PizzaService.updateProfile({}, token); // TODO remove
        } catch(err){
            console.log(err);
        }
    }
    */
    
    const renderOrders = () => {
        if (!orders || orders.length < 0) {
            return (
                <>
                    <Typography> No orders yet! </Typography>
                </>
            );
        }
        return (
            <List>
                {orders.map((order) => (
                    <ListItem divider inset>
                        {order}
                    </ListItem>
                ))
                }
            </List>
        );
    };

    return (
        <>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    
                </Grid>
                <Grid item xs={12}>
                    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1} className={STYLES.primaryGradientLightBg}>
                        <Box pl={4} pr={3} py={1.2} display="flex" justifyContent="space-between" alignItems="center" className={STYLES.primaryGradientLightBg}>
                            <Typography variant="h4" className={STYLES.textWhite}>
                                Your profile
                            </Typography>
                            <Tooltip title="Home" aria-label="home">
                                <IconButton color="inherit" onClick={() => history.push('/profile')} className={[STYLES.iconButtonWhiteFill]}>
                                    <HomeIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Paper square elevation={2} style={{zIndex: 1}}>
                            <Tabs
                                value={currentTab}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleChangeTab}
                            >
                                <MyTab label="Information" {...a11yProps(0)} />
                                <MyTab label="Orders" {...a11yProps(1)} />
                            </Tabs>
                        </Paper>

                        <TabPanel value={currentTab} index={0}>
                            <Box display="flex" flexGrow={1} flexDirection="column">
                                    <>
                                        <Box px={4} py={2} style={{backgroundColor: 'white'}}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={4}>
                                                    <img
                                                        src={user.picture}
                                                        alt="Profile"
                                                    />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            <Typography style={{ marginBottom: '5px' }}>
                                                                {user.name}
                                                            </Typography>
                                                            <Typography>
                                                                <Link href={`mailto:${user.email}`}>
                                                                    {user.email}
                                                                </Link>
                                                            </Typography>
                                                    </Grid>
                                                    </Grid>

                                                </Grid>
                                        </Grid>
                                        </Box>
                                    </>
                            </Box>
                        </TabPanel>
                        <TabPanel value={currentTab} index={1}>
                            <Box display="flex" flexGrow={1} flexDirection="column">
                                    <>
                                        <Box px={4} py={2} style={{backgroundColor: 'white'}}>
                                            {renderOrders()}
                                        </Box>
                                    </>
                            </Box>
                        </TabPanel>
                    </Box>
            </Grid>
        </Grid>
    </Container>      
        </>
    );
}


export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Redirect to="/home" />,
});

