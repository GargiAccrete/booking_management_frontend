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
const FetchData =(endpoint,id='')=>{
    return axios.get(`http://localhost:3002/${endpoint}/${id}`).then((result)=>{
        return result.data;

    })
}
const PutData = (endpoint,id,data) =>  {
    console.log("hoiiii")
    alert(id)
    return axios.put(`http://localhost:3002/${endpoint}/${id}` ,data).then(()=>{
        
    })
}


const deleteData = (endpoint,id) =>{
    console.log(id)
    return axios.delete(`http://localhost:3002/${endpoint}`).then((result)=>{
        return result.data;
        console.log(result.data)
})
}
export default {
    AddData,
    PutData,
    FetchData,
    deleteData,
    login
}