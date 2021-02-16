import axios from 'axios';

import { getConfig } from "../config.js";
const { apiOrigin = "http://localhost:3001", audience } = getConfig(); // TODO

/**
 * @class
 */
export default class PizzaService {

    /**
     * @method
     * @param {*} data
     * @param {String} authToken
     * @returns {Object}
     */
    static async createOrder(data, authToken) {
        try {
            const response = await axios({
                method: 'POST',
                url: `${apiOrigin}/api/order`,
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${authToken}`
                },
                data,
            });
            return response;
        } catch (err) {
            if (err.response) {
                throw new Error(err.data.message)
            }
            throw err;
        }
    }
}
