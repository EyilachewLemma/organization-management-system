import axios from "axios";
let apiCall = axios.create({
    baseURL: 'https://organization-management-c5e5b-default-rtdb.firebaseio.com/',
    headers: {
        'Content-Type': 'application/json',


    }
})

export default apiCall