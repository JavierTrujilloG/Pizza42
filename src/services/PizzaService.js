import axios from 'axios';

import { getConfig } from "../config.js";

const config = getConfig();
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
                url: `${config.API}/api/order`,
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${authToken}`
                },
                data,
            });
            return response.data;
        } catch (err) {
            if (err.response) {
                throw new Error(err.data.message)
            }
            throw err;
        }
    }
}
