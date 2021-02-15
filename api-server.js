const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const ManagementClient = require('auth0').ManagementClient;

const authConfig = require("./src/auth_config.json");

const app = express();
app.use(express.json());

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

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
  clientId: authConfig.backend_clientId,
  clientSecret: authConfig.backend_clientSecret,
    // scope: authConfig.backend_scope
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

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

console.log(authConfig.audience, `https://${authConfig.domain}/`);

app.post("/api/order", checkJwt, jwtAuthz(['create:order']), (req, res) => {
    // TODO create order and update user_metadata
    res.json({
        success: true
    });
});

app.get("/resendEmail", checkJwt, (req, res) => {
    const params =  {};

    // TODO replace with  actual  function to resend email
    auth0.getUsers(params, function (err, users) {
        console.log(users.length);
        res.json({
            success: true,
            users: users.length
        });
    });

});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
