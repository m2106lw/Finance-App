import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const getTransactionsByYear = async (user_id, year) => {
    return axios.get(`${url}/api/getTransactionsByYear?user_id=${user_id}&year=${year}`)
    .then(response => response.data)
    .then(data => {
        return data
    })
    .catch(error => console.log(error));
}

const getTransactionTypes = async () => {
    return axios.get(`${url}/api/getTransactionTypes`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

const getTransactionsYears = async (user_id) => {
    return axios.get(`${url}/api/getTransactionsYears?user_id=${user_id}`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

const post_transaction = async (transactionObject) => {
    return axios.post(`${url}/api/postTransaction`, {
        transaction: transactionObject
    })
    .then(response => response.data)
    .then(data => {
        return data[0]["transaction_id"];
    })
    .catch(error => console.log(error));
}

const delete_transaction = async (user_id, transaction_id) => {
    return axios.delete(`${url}/api/deleteTransaction`, {
        transaction_id: transaction_id,
        user_id: user_id
    })
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

module.exports = {
    getTransactionsByYear, getTransactionTypes, getTransactionsYears, post_transaction, delete_transaction
}