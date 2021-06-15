import axios from 'axios';
import React from 'react';
import {authToken} from "../constant";

//const authToken = {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}

class CreateJoin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            class_name:"",
            section:"",
            subject:"",
            room:"",
            class_code:"",
            status:200,
        }
    }

    onSubmitJoin = e => {
        e.preventDefault();
        const JoinData={
            class_code:this.state.class_code,
        };
        axios.post('http://127.0.0.1:8000/join/',JoinData,authToken)    
        .then(response => {
            this.setState({
            status:response.status,
                //open:false,
            })
        }).catch(error => {
            this.setState({
                status:error.response.status,
            })
        })
        window.location.href = '/classroom';
    }

 
    onSubmitCreate = e => {
        e.preventDefault();
        const CreateClassData={
            class_name:this.state.class_name,
            section:this.state.section,
            subject:this.state.subject,
            room:this.state.room
        };
        axios.post('http://127.0.0.1:8000/create/',CreateClassData,authToken)    
        .then(response => {
            this.setState({
            status:response.status,
                //open:false,
            })
        }).catch(error => {
            this.setState({
                status:error.response.status,
            })
        })
        window.location.href = '/classroom';
    }

    render() {
        return (
            <>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Join a class or Create a class</h5>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>
                            <div className="modal-body">

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item w-50" role="presentation">
                                        <button className="nav-link active w-100" id="join-tab" data-bs-toggle="tab" data-bs-target="#join" type="button" role="tab" aria-controls="join" aria-selected="true">Join</button>
                                    </li>
                                    <li className="nav-item w-50" role="presentation">
                                        <button className="nav-link w-100" id="create-tab" data-bs-toggle="tab" data-bs-target="#create" type="button" role="tab" aria-controls="create" aria-selected="false">Create</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="join" role="tabpanel" aria-labelledby="join-tab">
                                        <form action="/classroom/" method="POST" onSubmit={this.onSubmitJoin}>
                                            <div className="card text-center">
                                                <div className="card-header">{/* Featured */}</div>
                                                <div className="card-body">
                                                    <h5 className="card-title"><label className="card-title" htmlFor="joining-code">Class Code</label></h5>
                                                    <p className="card-text">Ask your teacher for the class code, then enter it here.</p>
                                                    <input className="form-control" type="text" name="class_code" onChange={e => this.setState({class_code: e.target.value})} id="class_code" placeholder="Class code" />
                                
                                                </div>
                                                <div className="card-footer text-muted">{/* 2 days ago */}</div>
                                                <button type="submit" className="btn btn-primary">Join</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="create" role="tabpanel" aria-labelledby="create-tab">
                                        <form action="/classroom/" method="POST" onSubmit={this.onSubmitCreate}>
                                            <div className="card text-center">
                                                <div className="card-header">{/* Featured */}</div>
                                                <div className="card-body">
                                                    <h5 className="card-title"><label className="card-title" htmlFor="class-name">Class Name</label></h5>
                                                    <p className="card-text">This will the name for your class to recognize.</p>
                                                    <input className="form-control" type="text" name="class_name"  onChange={e => this.setState({class_name: e.target.value})} id="class-name" placeholder="ClassName" />
                                                    <input className="form-control" type="text" name="section" onChange={e => this.setState({section: e.target.value})} id="class-Section" placeholder="Section" />
                                                    <input className="form-control" type="text" name="subject" onChange={e => this.setState({subject: e.target.value})} id="class-Subject" placeholder="Subject" />
                                                    <input className="form-control" type="text" name="room" onChange={e => this.setState({room: e.target.value})} id="class-room" placeholder="Room" />
                                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                                </div>
                                                <div className="card-footer text-muted">{/* 2 days ago */}</div>
                                                <button type="submit" className="btn btn-primary">Create</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default CreateJoin;