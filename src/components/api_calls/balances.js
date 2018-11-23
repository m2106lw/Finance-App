import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const getAccountBalances = async (account_id) => {
    return axios.get(`${url}/api/getAccountBalances?account_id=${account_id}`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}
module.exports = {
    getAccountBalances
}