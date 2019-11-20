import ApolloClient from "apollo-boost";
import config from "../config";

const client = new ApolloClient({
    uri: config.API_URL
});

export default client;
