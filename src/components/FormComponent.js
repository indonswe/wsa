import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {

const baseURL= "http://localhost:8080/api/v1/person/";



    const [persons, setPersons] = useState([]);
    const [message,setMessage] = useState();
    const [error,setError] = useState();

    const [id,setId] = useState(0);

    const sendGetRequest = async () => { // async keyword is used tp make a function asynchronous.
        console.log("start sendGetRequest");
        await axios.get(baseURL).then(res => { // await keyword asks the executor to wait for the defined task to be executed
            console.log("DATA", res.data);
            console.log("STATUS", res.status);
            // update person state
            if(res.status === 200){
                setPersons(res.data);
                setMessage('Operation is Done!');
            } else {
                setMessage('API ERROR' + res.status);
            }
            setError();
        }).catch( err => {
            console.log("ERROR " , err);
            // update error state
            if(err.message){
                setError(err.message);
            } else {
                setError(err);
            }
            setMessage();
        });
        console.log("end sendGetRequest");
    };

    const sendGetRequestById = async () => {
        console.log("start sendGetRequestById");
        let validation = true;
        if(id === 0){
            setError('Param is not valid!');
            validation = false;
        }
        if(validation){
            await axios.get(`${baseURL}${id}`).then(res => {
                console.log("RESPONSE", res);
                if(res.status === 200){
                    setPersons(res.data);
                    setMessage('Operation is Done!');
                } else {
                    setMessage('API ERROR' + res.status);
                }
                setError();
            }).catch(err => {
                console.log("ERROR " , err);
                // update error state
                if(err.response){
                    console.log("ERROR RESPONSE " , err.response);
    
                    setError(err.response.data.statusText);
                } else {
                    setError(err.message);
                }
                setMessage();
            });
        }
        
        console.log("end sendGetRequestById");
    };

    //const [person,setPerson] = useState({id: 0, email: '', firstName: '',lastName: '', title: ''});
    const sendPostRequest = async () => {
        const data = {email: 'test.test@test.se', firstName: 'Test12',lastName: 'Test 22', title: 'Test Title'};
        console.log("start sendPostRequest");
        await axios.post(baseURL,data).then(res => {
            console.log("RESPONSE", res);
            if(res.status === 201){
                setPersons(res.data);
                setMessage('Operation is Done!');
            } else {
                setMessage('API ERROR' + res.status);
            }
            setError();
        }).catch(err => {
            console.log("ERROR " , err);
            // update error state
            if(err.response){
                console.log("ERROR RESPONSE " , err.response);

                setError(err.response.data.statusText);
            } else {
                setError(err.message);
            }
            setMessage();
        });
        console.log("end sendPostRequest");
    };

    const sendPutRequest = async() => {
        const data = {id: 1, email: 'test.test11@test.se', firstName: 'Test11',lastName: 'Test 11', title: 'Test 11'};
        await axios.put(baseURL,data).then(res => {
            console.log("RESPONSE", res);
            if(res.status === 204){ // PUT OPERATION IS DONE = 204
                setPersons(res.data);
                setMessage('Operation is Done!');
            } else {
                setMessage('API ERROR' + res.status);
            }
            setError();
        }).catch(err => {
            console.log("ERROR " , err);
            // update error state
            if(err.response){
                console.log("ERROR RESPONSE " , err.response);

                setError(err.response.data.statusText);
            } else {
                setError(err.message);
            }
            setMessage();
        });
    };
       

const Form = () => {
<div className="container">
            <h3>AXIOS Example</h3>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                <div className="col m-2">
                    <button type="button" className="btn btn-info" onClick={sendGetRequest} >Fetch All Data</button>
                </div>               
            </div>
            <div className="row">
                <div className="col-3 m-2">
                        <button type="button" className="btn btn-primary" onClick={sendGetRequestById} >Fetch Data By Id</button>
                </div>
                <div className="col-3 m-2">
                    <input type="text" className="form-control" onChange={(e) => setId(e.target.value)} />
                </div>
            </div>

            <div className="row">
                <div className="col m-2">
                    <button type="button" className="btn btn-success" onClick={sendPostRequest} >Post Data</button>
                </div>               
            </div>

            <div className="row">
                <div className="col m-2">
                    <button type="button" className="btn btn-warning" onClick={sendPutRequest} >Put Data</button>
                </div>               
            </div>
        </div>
}

    return (
        <div>
           <Form/> 
        </div>
    );
};

export default FormComponent;