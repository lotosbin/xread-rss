const result = require('dotenv').config({debug: process.env.DEBUG});
if (result.error) {
    throw result.error
}
console.log(result.parsed);

const config = {
    API_URL: process.env.REACT_APP_API_URL || ""
};
console.log(config);
export default config;
