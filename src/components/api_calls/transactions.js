import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const getTransactionsByYear = async (user_id, year) => {
    return axios.get(`${url}/api/transaction/getTransactionsByYear?user_id=${user_id}&year=${year}`)
    .then(response => response.data)
    .then(data => {
        return data
    })
    .catch(error => console.log(error));
}

const getTransactionsYears = async (user_id) => {
    return axios.get(`${url}/api/transaction/getTransactionsYears?user_id=${user_id}`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

const post_transaction = async (transactionObject) => {
    return axios.post(`${url}/api/transaction/postTransaction`, {
        transaction: transactionObject
    })
    .then(response => response.data)
    .then(data => {
        return data[0]["transaction_id"];
    })
    .catch(error => console.log(error));
}

const delete_transaction = async (user_id, transaction_id) => {
    console.log(transaction_id);
    return axios.delete(`${url}/api/transaction/deleteTransaction?user_id=${user_id}&transaction_id=${transaction_id}`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

module.exports = {
    getTransactionsByYear, getTransactionsYears, post_transaction, delete_transaction
}