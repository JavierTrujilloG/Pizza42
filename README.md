#  Pizza 42 - An Auth0 Demo
Pizza 42 is a (fictitious) national pizza delivery chain. They’re in the process of modernizing their online ordering system and would like to use Auth0 for their identity needs.
This demo showcases multiple features of Auth0 using its [React SDK](https://github.com/auth0/auth0-react), primarily:
- Login with Google as Social Provider
- Protect routes using Access Token scopes
- Enrich user profile information with user_metadata

## Live Demo
You can access a live demo [here](https://pizza42-auth0.herokuapp.com/)

## Configuration
Make sure to replace the values on auth_config.json file; take a look at the [original repo](https://github.com/auth0-samples/auth0-react-samples) for more information

You will also need to create a .env file with the variables: CLIENT_ID, BACKEND_CLIENT_ID, BACKEND_CLIENT_SECRET

## Run the sample
This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

## Deployment

Compiles and minifies for production. It will also start up a server on port 3000

```bash
npm run prod
```
