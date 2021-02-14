import React, { useContext } from 'react';
import clsx from 'clsx';
import { 
    Drawer, 
    AppBar, 
    Toolbar,
    List,
    Typography,
    Box,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip 
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth0 } from "@auth0/auth0-react";
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from '../components';
import { AppStyles, ThemeColors } from '../config/themes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#F7F7F7'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
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
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
    const [open, setOpen] = React.useState(false);
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <AppBar position="absolute" color="default" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Box className={STYLES.fullWidth} display="flex" flexDirection="row" alignItems="center" >
                        <Logo width={150} />
                        <Box px={2}>
                        <Typography variant="h6" className={[STYLES.textPrimary]}>Pizza 42</Typography>
                        </Box>
                    </Box>
                    <Tooltip title="Log Out" aria-label="log out">
                        <IconButton color="inherit" onClick={logout} className={[STYLES.iconButtonWhiteFill]}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </div>
    );
}
