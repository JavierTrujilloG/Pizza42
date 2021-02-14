import React, { useState } from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Theme } from './config/themes';
import { AuthContext } from './contexts';
import Home from './views/Home';

const NoMatch = () => ( 
  <Redirect to="/login" />
);

function App() {
    const existingOrder = JSON.parse(localStorage.getItem('currentOrder')) || [];
    const [currentOrder, setCurrentOrder] = useState(existingOrder); // Add some logic so that current order is overwritten with order in token if current  order is null
    /** @type {IAuthContext} */
    const authContext = {
        addToOrder: (id) => {
            localStorage.setItem('currentOrder', JSON.stringify([...currentOrder, id]));
            setCurrentOrder([...currentOrder, id]);
        },
        removeFromOrder: (id) => {
            // Inmutability!
            const tempArr = [...currentOrder];
            tempArr.pop(id);
            localStorage.setItem('currentOrder', JSON.stringify(tempArr));
            setCurrentOrder(tempArr);
        }
    }

    console.log('EEE', currentOrder);
    return (
        <ThemeProvider theme={Theme} >
            <CssBaseline />
            <AuthContext.Provider value={{ currentOrder, ...authContext }}>
                <Router>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default App;
/*


const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
*/
