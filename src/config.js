import configJson from "./auth_config.json";

require('dotenv').config();

export function getConfig() {
    return {
        domain: configJson.domain,
        clientId: process.env.REACT_APP_CLIENT_ID, // get it from env as extra security measure
        audience: configJson.audience,
        scope: configJson.app_scope,
        custom_claim: configJson.custom_claim
    };
}
