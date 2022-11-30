import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const AddData = (endpoint, data) => {
    try {
        // console.log(data);
        let options = {
            url: `http://localhost:3002/${endpoint}`,
            data: data,
            headers: {
                'content-type': 'application/json',
                'X-Req-Time': '1668509681',
                'Access-Control-Allow-Origin': '*'
            },
            method: 'post'
        }
        console.log('options', options);
        return axios(options).then(() => {
            console.log("data post" + data)
        })
    } catch (error) {
        // console.log(error),'lllllllllllllllll';
    }
}

const login = (endpoint, data) => {
    try {
        // console.log(data);
        let options = {

            url: `http://localhost:3002/${endpoint}`,
            data: data,
            headers: {
                'content-type': 'application/json',
                'X-Req-Time': '1668509681',
                'Access-Control-Allow-Origin': '*'
            },
            method: 'post'
        }
        return axios(options).then(() => {
            console.log("data post" + data)
        })
    } catch (error) {
        // console.log(error),'lllllllllllllllll';
    }
}

// const FetchData =(endpoint,id='')=>{
//     try {
//         // console.log(data);
//         let options = {
//          url : `http://localhost:3002/${endpoint}`,
//         //  data:result.data,
//             headers : {
//                 'content-type': 'application/json',
//                 'X-Req-Time': '1668509681',
//                 'Access-Control-Allow-Origin': '*' 
//             },
//             method : 'post'
//         }
//         return axios(options).then((result)=>{
//             console.log("first",result.data)
//            return result.data

//         })
//     } catch (error) {
//         // console.log(error),'lllllllllllllllll';
//     }


// }
const FetchData = (endpoint) => {
    try {
        let auth = JSON.parse(localStorage.getItem('authToken'))
        let token = 'Bearer ' + auth;
        if (auth) {
            let options = {
                url: `http://localhost:3002/${endpoint}`,
                headers: {
                    'content-type': 'application/json',
                    'X-Req-Time': '1668509681',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': token
                },
                method: 'get'
            }
            console.log('options', options);
            return axios(options).then((result) => {
                return result.data;
            })
        }
        else {
            toast("Please login")
        }
    }
    catch (error) {
        console.log(error, 'lllllllllllllllll');
    }
    // return axios.get(`http://localhost:3002/${endpoint}`).then((result) => {
    //     return result.data;

    // })
}
const PutData = (endpoint, data) => {
    let auth = JSON.parse(localStorage.getItem('authToken'))
    let token = 'Bearer ' + auth;
    try {
        if (auth) {
            // console.log(data);
            let options = {
                url: `http://localhost:3002/${endpoint}`,
                data: data,
                headers: {
                    'content-type': 'application/json',
                    'X-Req-Time': '1668509681',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': token
                },
                method: 'put'
            }
            return axios(options).then(() => {
                console.log("data posted", data)
            })
        }
        else {
            toast("Please login")
        }
    } catch (error) {
        // console.log(error),'lllllllllllllllll';
    }
}


const deleteData = (endpoint, id) => {
    let auth = JSON.parse(localStorage.getItem('authToken'))
    let token = 'Bearer ' + auth;
try {
        if (auth) {
            // console.log(data);
            let options = {
                url: `http://localhost:3002/${endpoint}`,
                headers: {
                    'content-type': 'application/json',
                    'X-Req-Time': '1668509681',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': token
                },
                method: 'get'
            }
            return axios(options).then(() => {
                console.log("data deleted")
            })
        }
        else {
            toast("Please login")
        }
    }
    catch (error) {
        // console.log(error),'lllllllllllllllll';
    }

    //     console.log(id)
    //     return axios.delete(`http://localhost:3002/${endpoint}`).then((result)=>{
    //         return result.data;
    //         console.log(result.data)
    // })
}
export default {
    AddData,
    PutData,
    FetchData,
    deleteData,
    login
}