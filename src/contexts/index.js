import { createContext } from 'react';

/**
 * Context to store current order session (i.e pizzas)
 * TODO rename appropiately
 * It will most likely be entirely replaced by Auth0 hook
 *
 * @interface
 * @typedef {Object} IAuthContext
 * @property {Function} addToOrder
 * @property {Function} removeFromOrder
 */
const IAuthContext = {};

const AuthContext = createContext({});

export { AuthContext };
