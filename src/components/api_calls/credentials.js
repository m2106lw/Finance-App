import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const user_login = (username, password) => {
    return axios.post(`${url}/api/login/login`,
    {
        auth: {
            username: username,
            password: password
        }
    })
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}
module.exports = {
    user_login
}