import React, { useState } from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Theme } from './config/themes';
import { OrderContext } from './contexts';
import Home from './views/Home';
import Checkout from './views/Checkout';
import Profile from './views/Profile';
import MainLayout from './layouts/MainLayout';

const NoMatch = () => ( 
  <Redirect to="/home" />
);

function App() {
    const existingOrder = JSON.parse(localStorage.getItem('currentOrder')) || [];
    const [currentOrder, setCurrentOrder] = useState(existingOrder); // TODO Add some logic so that current order is overwritten with order in token if current  order is null
    /** @type {IOrderContext} */
    const orderContext = {
        addToOrder: (id) => {
            localStorage.setItem('currentOrder', JSON.stringify([...currentOrder, id]));
            setCurrentOrder([...currentOrder, id]);
        },
        removeFromOrder: (id) => {
            // Inmutability!
            const tempArr = [...currentOrder];
            const index = tempArr.indexOf(id);
            if (index > -1) {
                tempArr.splice(index, 1);
            }
            localStorage.setItem('currentOrder', JSON.stringify(tempArr));
            setCurrentOrder(tempArr);
        },
        resetCurrenOrder: (newOrder) => {
            localStorage.setItem('currentOrder', JSON.stringify(newOrder));
            setCurrentOrder(newOrder);
        }
    }

    return (
        <ThemeProvider theme={Theme} >
            <CssBaseline />
            <OrderContext.Provider value={{ currentOrder, ...orderContext }}>
                <Router>
                    <Switch>
                        <MainLayout>
                            <Route path="/home" component={Home} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/profile" component={Profile} />
                            <Route path="*" component={NoMatch} />
                        </MainLayout>
                    </Switch>
                </Router>
            </OrderContext.Provider>
        </ThemeProvider>
    );
}

export default App;
