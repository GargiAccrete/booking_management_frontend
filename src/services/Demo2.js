import axios from 'axios'

const AddData = (endpoint,data) =>  {
    return axios.post(`http://localhost:3004/${endpoint}`,data).then(()=>{
        console.log("data post" +data)
    })
} 

const FetchData =(endpoint,id='')=>{
    return axios.get(`http://localhost:3004/${endpoint}/${id}`).then((result)=>{
        return result.data;

    })
}

const PutData = (endpoint,id,data) =>  {
    console.log("hoiiii")
    alert(id)
    return axios.put(`http://localhost:3004/${endpoint}/${id}` ,data).then(()=>{
        
    })
}


const deleteData = (endpoint,id) =>{
    console.log(id)
    return axios.delete(`http://localhost:3004/${endpoint}/${id}`).then((result)=>{
        return result.data;
        console.log(result.data)
})
}
export default {
    AddData,
    PutData,
    FetchData,
    deleteData
}