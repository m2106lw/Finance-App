import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const getTransactionTypes = async () => {
    return axios.get(`${url}/api/transaction_types/transaction_types`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

module.exports = {
    getTransactionTypes
}