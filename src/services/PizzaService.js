import axios from 'axios';

import { API } from '../config';

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
                url: API.PIZZA,
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
