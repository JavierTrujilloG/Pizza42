import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { PizzaService } from '../services';
import { AppStyles, ThemeColors } from '../config/themes';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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
export default function Profile({location, match, history }) {
    const STYLES = AppStyles();
    const classes = useStyles();
    //const { user } = useAuth0();
    const user = {};
    // TODO save infor
    const [currentTab, setCurrentTab] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };
    const orders = [{
        id: 'PIZZA4', date: new Date(), items: ['javarita']
    }];

    const updateProfileInfo = async () => {
        /*
        const {
            getAccessTokenSilently
          } = useAuth0();
          */
        const token = 'dummy';//await getAccessTokenSilently();
        try {
            await PizzaService.updateProfile({}, token); // TODO remove
        } catch(err){
            console.log(err);
        }
    }
    
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
                        {order.id}
                    </ListItem>
                ))
                }
            </List>
        );
    };

    // TODO add authentication
    return (
        <>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1} className={STYLES.primaryGradientLightBg}>
                        <Box pl={4} pr={3} py={1.2} display="flex" justifyContent="space-between" alignItems="center" className={STYLES.primaryGradientLightBg}>
                            <Typography variant="h4" className={STYLES.textWhite}>
                                Your profile
                            </Typography>
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
                                            <img
                                                    src={user.picture}
                                                    alt="Profile"
                                                />
                                            <List dense>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={'Name'}
                                                    />
                                                    <InputLabel htmlFor="address" className={[STYLES.textWhite]}>Address</InputLabel>
            <TextField
                value={'sss'}
                onInput={(e) => {}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user-address"
                name="address"
                autoComplete="address"
                autoFocus
            />
            <ListItemText
                                                        primary={'Name'}
                                                    />
                                                    <InputLabel htmlFor="address" className={[STYLES.textWhite]}>Address</InputLabel>
            <TextField
                value={'sss'}
                onInput={(e) => {}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user-address"
                name="address"
                autoComplete="address"
                autoFocus
            />
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={updateProfileInfo}
                                        className={classes.button}
                                    >
                                        Save
                                    </Button>
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

/* TODO
export default withAuthenticationRequired(ProfileComponent, {
    onRedirecting: () => <Loading />,
  });
  */
