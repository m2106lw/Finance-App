import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const getCars = async (user_id) => {
    return axios.get(`${url}/api/car/getCars?user_id=${user_id}`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}
module.exports = {
    getCars
}