const axios = require('axios');
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const getAccounts = async (user_id) => {
    return axios.get(`${url}/api/getAccounts?user_id=${user_id}`)
    .then(response => response.data)
    .then(data => {
        return data
    })
    .catch(error => console.log(error));
}

module.exports = {
    getAccounts
}