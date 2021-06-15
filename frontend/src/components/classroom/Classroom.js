import React from 'react';
import ClassroomCard from './ClassroomCard';
import {authToken} from "../constant";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import { Redirect } from "react-router-dom";

class classroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myClasses:[],
            errorMessage:null,
        }
    }
    componentDidMount() {
        trackPromise(axios.get('http://127.0.0.1:8000/',authToken)
            .then(response => {
                this.setState({
                    myClasses:response.data,
                })
            })
            .catch(error =>{
                this.setState({
                    errorMessage:error.data,
                })
            }))
    }
    
    render(){


        const {myClasses} = this.state;
        if (localStorage.getItem('token')){
        return  (
            <>
            <h2 className="text-center">Your Classes</h2>
            <div className="container">
                <div className="row ">
                { myClasses.map((c)=>(
                    <ClassroomCard key={c.id} cId={c.id}  cName={c.class_name} cSection={c.section} cSubject={c.subject} />
                ))}    
                </div>
                
            </div>
            </>
        )  
        
       }
       else{
           return <Redirect to="/" />
       }
    }
}

export default classroom;