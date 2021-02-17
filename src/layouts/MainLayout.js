import React, { useContext } from 'react';
import clsx from 'clsx';
import { 
    AppBar, 
    Toolbar,
    Box,
    IconButton,
    Tooltip 
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from '../components';
import { AppStyles, ThemeColors } from '../config/themes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundImage: `url('/images/bg_pizzeria.jpg')`
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        backgroundColor: ThemeColors.primaryGradientDark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'black'
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));


export default function PrivateLayout({ children }) {
    const classes = useStyles();
    const STYLES = AppStyles();
    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <AppBar position="absolute" color="default" className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <Box className={STYLES.fullWidth} display="flex" flexDirection="row" alignItems="center" >
                        
                        <Logo width={90} linkToHome/>
                        
                    </Box>

                    {isAuthenticated ?
                        <>
                            <Tooltip title="My Account" aria-label="my accounnt">
                                <IconButton color="inherit" onClick={() => history.push('/profile')} className={[STYLES.iconButtonWhiteFill]}>
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Log Out" aria-label="log out">
                                <IconButton color="inherit" onClick={logout} className={[STYLES.iconButtonWhiteFill]}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    :
                    <Tooltip title="Sign in" aria-label="log out">
                            <IconButton color="inherit" onClick={loginWithRedirect} className={[STYLES.iconButtonWhiteFill]}>
                                <VpnKeyIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </div>
    );
}
