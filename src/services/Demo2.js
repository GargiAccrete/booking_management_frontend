import axios from 'axios'

const AddData = (endpoint,data) =>  {
    try {
        // console.log(data);
        let options = {

            url : `http://localhost:3002/${endpoint}`,
            data:data,
            headers : {
                'content-type': 'application/json',
                'X-Req-Time': '1668509681',
                'Access-Control-Allow-Origin': '*' 
            },
            method : 'post'
        }
        console.log('options',options);
        return axios(options).then(()=>{
            console.log("data post" +data)
        })
    } catch (error) {
        // console.log(error),'lllllllllllllllll';
    }
} 

const login = (endpoint,data) =>  {
    try {
        // console.log(data);
        let options = {

            url : `http://localhost:3002/${endpoint}`,
            data:data,
            headers : {
                'content-type': 'application/json',
                'X-Req-Time': '1668509681',
                'Access-Control-Allow-Origin': '*' 
            },
            method : 'post'
        }
        return axios(options).then(()=>{
            console.log("data post" +data)
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
const FetchData =(endpoint)=>{
    return axios.get(`http://localhost:3002/${endpoint}`).then((result)=>{
        return result.data;

    })
}
const FetchCityData =(endpoint)=>{
    return axios.get(`http://localhost:3002/${endpoint}`).then((result)=>{
        return result.data;

    })
}
const PutData = (endpoint,data) =>  {
    try {
        // console.log(data);
        let options = {

            url : `http://localhost:3002/${endpoint}`,
            data:data,
            headers : {
                'content-type': 'application/json',
                'X-Req-Time': '1668509681',
                'Access-Control-Allow-Origin': '*' 
            },
            method : 'put'
        }
        return axios(options).then(()=>{
            console.log("data posted" ,data)
        })
    } catch (error) {
        // console.log(error),'lllllllllllllllll';
    }
  }


const deleteData = (endpoint,id) =>{
    try {
        // console.log(data);
        let options = {

            url : `http://localhost:3002/${endpoint}`,
            headers : {
                'content-type': 'application/json',
                'X-Req-Time': '1668509681',
                'Access-Control-Allow-Origin': '*' 
            },
            method : 'get'
        }
        return axios(options).then(()=>{
            console.log("data deleted")
        })
    } catch (error) {
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
    login,
    FetchCityData
}