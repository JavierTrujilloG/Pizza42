import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, 
    MenuItem,
    Paper,
    Typography
} from '@material-ui/core';

import { AuthContext } from '../contexts';
import logo from "../assets/logo.svg";

// --------------------------------------------------------------------
// STYLES: makeStyles must be outside of functional component
const useStyles = makeStyles((theme) => ({
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
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        maxWidth: '350px'
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


const pizzas = [
    {
        id: 'pythonchuto',
        name: 'Pythonchuto',
        description: 'For the adventurous, strongly typed prochuto pizza with',
        image: ''
    },
    {
        id: 'javarita',
        name: 'Javarita',
        description: 'Not a simple margarita strongly cheese typed cdjsc jdsn',
        image: ''
    },
    {
        id: 'c++bonara',
        name: 'C++bonara',
        description: 'For the classic, strongly cheese typedcshdbsbd  cjsdhs ',
        image: ''
    },
    {
        id: 'diavolajs',
        name: 'DiavolaJS',
        description: 'For the adventurous and curious, a diavola',
        image: ''
    }
];

const PizzaList = () => {
    const classes = useStyles();
    const { currentOrder, removeFromOrder, addToOrder } = useContext(AuthContext);
    const addPizzaToCart = (addPizza, pizzaId) => {
        addPizza ? addToOrder(pizzaId) : removeFromOrder(pizzaId);
    }
    const pizzaComponents = pizzas.map((pizza) => {
        const inCart = currentOrder.indexOf(pizza.id) > -1;
        return (
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                { pizza.name }
                </Typography>
                <img src={logo} />
                <Typography > {pizza.description} </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addPizzaToCart(!inCart, pizza.id)}
                    className={classes.button}
                    >
                    {!inCart ? 'Add to cart' : 'Remove from cart'}
                </Button>
            </Paper>
        );
    });
    return (
    <div style={{ display: 'flex', justifyContent: 'space-around'}}> 
        {pizzaComponents}
    </div>
    );
};

// --------------------------------------------------------------------
// MAIN COMPONENT
export default function Home({location, match, history }) {
    const classes = useStyles();
    const { currentOrder } = useContext(AuthContext);
    /*
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();
    */
    const isAuthenticated = false;
    const user = {};
    const loginWithRedirect = () => {};
    
    return (
        <>
            <main className={classes.layout}>
                    <Typography component="h1" variant="h4" align="center">
                        Pizzeria
                    </Typography>
                    <PizzaList/>

                    {currentOrder && currentOrder.length > 0 &&

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {history.push('/checkout/')}}
                        className={classes.button}
                        >
                        Checkout
                    </Button>
                    }
            </main>
        </>
    );
}

