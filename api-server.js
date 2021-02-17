const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const { join } = require("path");
const ManagementClient = require('auth0').ManagementClient;

require('dotenv').config();

const { createId } = require("./src/utils/RandomGenerator");
const authConfig = require("./src/auth_config.json");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
if (process.env.NODE_ENV === "development") {
    const appPort = process.env.SERVER_PORT || 3000;
    const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;
    app.use(cors({ origin: appOrigin }));
} else {
    app.use(cors({}));
}

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

// Get access token to interact with Management API
const auth0 = new ManagementClient({
  domain: authConfig.domain,
  clientId: process.env.BACKEND_CLIENT_ID,
  clientSecret: process.env.BACKEND_CLIENT_SECRET,
});

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "build")));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});


/*
 * https://auth0.github.io/node-auth0/module-management.ManagementClient.html#updateUser
 */
app.post("/api/order", checkJwt, jwtAuthz(['create:order']), async (req, res) => {
    try {
        const { user } = req;
        // User metadata is not included in token, request full user from Management API
        const fullUser = await auth0.getUser({ id: user.sub });

        // Create random order string
        const id = `PIZZA44-${createId(7)}`;

        // Add id to existing orders array if any
        const orders = fullUser.user_metadata.orders || [];
        orders.push(id);

        // Update user_metada with new order history
        await auth0.updateUserMetadata({ id: user.sub }, { orders });
        res.json({
            success: true,
            orderId: id
        });
    } catch (err) {
        res.json({
            success: false,
            error: err.message
        });
    }
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
