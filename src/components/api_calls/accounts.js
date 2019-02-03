import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const get_accounts = async (token) => {
    return axios.get(`${url}/api/accounts`, {headers: {"x-auth-token": token}})
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

const get_account = async (token, account_id) => {
    return axios.get(`${url}/api/account/${account_id}`, {headers: {"x-auth-token": token}})
    .then(response => response.data)
    .then(data => {
        return data[0];
    })
    .catch(error => console.log(error));
}

const get_account_balances = async (token, account_id) => {
    return axios.get(`${url}/api/account/${account_id}/balances`, {headers: {"x-auth-token": token}})
    .then(response => response.data)
    .then(data => {
        return data[0];
    })
    .catch(error => console.log(error));
}

const create_account = async (token, name, description) => {
    return axios.post(`${url}/api/accounts`, {headers: {"x-auth-token": token}}, {
        account_name: name,
        account_description: description,
        account_id: -1
    })
    .then(response => response.data)
    .then((data) => {
        return data[0]["account_id"];
    })
    .catch((error) => {
        console.log(error);
    })
}

const modify_account = async (token, name, description) => {
    return axios.put(`${url}/api/account/${account_id}`, {headers: {"x-auth-token": token}}, {
        account_name: name,
        account_description: description
    })
    .then(response => response.data)
    .then((data) => {
        return data[0]["account_id"];
    })
    .catch((error) => {
        console.log(error);
    })
}

module.exports = {
    get_accounts, get_account, get_account_balances, create_account, modify_account
}