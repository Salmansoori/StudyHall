import React from 'react'
import HeadingItem from "./HeadingItem";
import ListAll from "./ListAll";
import axios from 'axios';
import {authToken} from "../../../constant";
import {trackPromise} from "react-promise-tracker";


export default class People extends React.Component {
    constructor() {
        super();
        this.state=({
            students:[],
            teachers:[],
            totalStudents:0,
        })
    }
    componentDidMount() {
        trackPromise(axios.get(`http://127.0.0.1:8000/students/?class_id=${this.props.id}`,authToken)
            .then(response=>{
                this.setState({
                    students:response.data,
                    totalStudents:response.data.length,
                })
            })
            .catch(error =>{
            }))
        trackPromise(axios.get(`http://127.0.0.1:8000/teachers/?class_id=${this.props.id}`,authToken)
            .then(response=>{
                this.setState({
                    teachers:response.data,
                    totalTeachers:response.data.length,
                })
            })
            .catch(error =>{
            }))
    }

    render() {
        const {students,totalStudents,teachers} = this.state
        return (
            <React.Fragment>
                <HeadingItem title="Teacher"/>
                {teachers.map((teacher,index)=>(
                    <ListAll title={teacher.username} key={index}/>
                ))}
                <HeadingItem title="Students" total={totalStudents+" students"}/>
                {students.map((student,index)=>(
                    <ListAll title={student.username} key={index}/>
                ))}


            </React.Fragment>
        )
    }
}