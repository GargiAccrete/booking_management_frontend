import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const AddData = (endpoint, data) => {
    try {
        let auth = JSON.parse(localStorage.getItem('authToken'))
        let token = 'Bearer ' + auth;
        if (auth) {
            let options = {
                url: `http://localhost:3002/${endpoint}`,
                data: data,
                headers: {
                    'content-type': 'application/json',
                    'X-Req-Time': '1668509681',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': token
                },
                method: 'post'
            }
            console.log('options', options);
            return axios(options).then(() => {
                console.log("data post" + data)
            })
        }
        else {
            toast("Please login")
        }
    }
    catch (error) {
        console.log(error, 'lllllllllllllllll');
    }
}

const login = async (endpoint, data) => {
    try {
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
        // const res=JSON.stringify(data)
        let result;
        axios(options).then((res) => {
            if (res.data.authToken) {
                localStorage.setItem("authToken", JSON.stringify(res.data.authToken));
                result = res.data.authToken
            }
        })
        return result;
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
const FetchCityData = (endpoint) => {
   
    return axios.get(`http://localhost:3002/${endpoint}`).then((result) => {
        return result.data;

    })
}
const PutData = (endpoint, data) => {
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
            method: 'put'
        }
        return axios(options).then(() => {
            console.log("data posted", data)
        })
    } catch (error) {
        // console.log(error),'lllllllllllllllll';
    }
}


const deleteData = (endpoint, id) => {
    try {
        // console.log(data);
        let options = {

            url: `http://localhost:3002/${endpoint}`,
            headers: {
                'content-type': 'application/json',
                'X-Req-Time': '1668509681',
                'Access-Control-Allow-Origin': '*'
            },
            method: 'get'
        }
        return axios(options).then(() => {
            console.log("data deleted")
        })
    } catch (error) {
        // console.log(error),'lllllllllllllllll';
    }
}
export default {
    AddData,
    PutData,
    FetchData,
    deleteData,
    login,
    FetchCityData
}