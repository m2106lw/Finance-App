import axios from 'axios';
// TODO: Variablilze the api server url
// TODO: Actually do error handling

const url = "http://localhost:8080";

const getGasByYear = async (user_id, year) => {
    return axios.get(`${url}/api/gas/getGasByYear?user_id=${user_id}&year=${year}`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

const getGasYears = async (user_id) => {
    return axios.get(`${url}/api/gas/getGasYears?user_id=${user_id}`)
    .then(response => response.data)
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}

module.exports = {
    getGasByYear, getGasYears
}