import axios from 'axios';
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

const postAccount = async (user_id, name, description) => {
    return axios.post("http://localhost:8080/api/postAccount", {
        user_id: user_id,
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

module.exports = {
    getAccounts, postAccount
}