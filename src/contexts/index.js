import { createContext } from 'react';

/**
 * Context to store current order session (i.e pizzas)
 *
 * @interface
 * @typedef {Object} IAuthContext
 * @property {Function} addToOrder
 * @property {Function} removeFromOrder
 */
const IOrderContext = {};

const OrderContext = createContext({});

export { OrderContext };
