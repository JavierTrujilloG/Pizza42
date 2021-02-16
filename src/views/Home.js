import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Container,
    Button, 
    MenuItem,
    Paper,
    Typography
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { OrderContext } from '../contexts';
import logo from "../assets/logo.svg";
import CONSTANTS from "../config/constants";

const { Pizzas } = CONSTANTS;

// --------------------------------------------------------------------
// STYLES: makeStyles must be outside of functional component
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        /*[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },*/
    },
    pizzaImages: {
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        paddingTop: '100%',
        margin: '15px 0px'
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
        backgroundColor: '#121515',
        maxWidth: '350px'
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    pizzaImage: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        margin: '10 0',
    },
    customTypography: {
        fontFamily: '"Josefin Sans"',
        color: 'white',
    },
    pizzaDescription: {
        color: 'white',
        marginBottom: '5px'
    }
}));

const PizzaList = () => {
    const classes = useStyles();
    const { currentOrder, removeFromOrder, addToOrder } = useContext(OrderContext);
    const addPizzaToCart = (addPizza, pizzaId) => {
        addPizza ? addToOrder(pizzaId) : removeFromOrder(pizzaId);
    };   
    const pizzaComponents = Pizzas.map((pizza) => {
        const inCart = currentOrder.indexOf(pizza.id) > -1;
        return (
            <Grid item xs={3}>
            <Paper className={classes.paper} elevation={3}>
                <Typography component="h1" variant="h4" align="center" className={classes.customTypography}>
                { pizza.name }
                </Typography>
                <Grid className={classes.pizzaImages} style={{ backgroundImage: `url(${pizza.image})`}}>
                </Grid>
                <Grid style={{ minHeight: '70px' }}>
                    <Typography className={classes.pizzaDescription}> {pizza.description} </Typography>
                </Grid>
                <Grid style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={() => addPizzaToCart(!inCart, pizza.id)}
                        className={classes.button}
                        disableRipple
                        >
                        {!inCart ? 'Add to cart' : 'Remove from cart'}
                    </Button>
                </Grid>
            </Paper>
        </Grid>
        );
    });
    return (
    <Grid container spacing={3}> 
        {pizzaComponents}
    </Grid>
    );
};

// --------------------------------------------------------------------
// MAIN COMPONENT
export default function Home({location, match, history }) {
    const classes = useStyles();
    const { currentOrder } = useContext(OrderContext);
    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12}>
                        <PizzaList/>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        {currentOrder && currentOrder.length > 0 &&

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {history.push('/checkout/')}}
                                className={classes.button}
                                startIcon={<ShoppingCartIcon/>}
                            >
                                Checkout
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

