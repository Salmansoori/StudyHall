import React from 'react'
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {red} from "@material-ui/core/colors";
import axios from "axios";
import {Divider} from "@material-ui/core";
import { authToken} from "../../../constant";
import {trackPromise} from "react-promise-tracker";

class PostComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PostComments:[],
            isErrorFree:false,
            totalComments:0,
            errorMessage:"",
        }
    }
    componentDidMount() {
        trackPromise(axios.get(`http://127.0.0.1:8000/postcomment/?class_id=${this.props.class_id}&post_id=${this.props.post_id}`,authToken)
            .then(response => {
                this.setState({
                    PostComments:response.data,
                    isErrorFree:true,
                    totalComments:response.data.length,
                })
            })
            .catch(error =>{
                this.setState({
                    errorMessage:error,
                })
            }))
    }
    render() {
        const {PostComments, isErrorFree,totalComments} = this.state
        if (isErrorFree && totalComments!==0) {
            return (
                <React.Fragment>
                    <Divider style={{marginTop: '20px', marginBottom: '10px'}}/>
                    <Typography color="textSecondary" component="p">
                        {totalComments} Class Comment
                    </Typography>
                    {PostComments.map((PostComment, index) => (
                        <React.Fragment key={index}>

                        <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" style={{backgroundColor: red[500]}}>
                                {PostComment.username.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={PostComment.username}
                        subheader={PostComment.updated.toString().slice(0,10)}
                    />
                    <Typography variant="body2" color="textSecondary" component="p" style={{marginLeft:'20px'}}>
                        {PostComment.post_comment}
                    </Typography>
                            <hr/>
                        </React.Fragment>
                        ))}
                </React.Fragment>
            )
        }
        else{
            return <React.Fragment>
            </React.Fragment>
        }
    }
}

export default PostComments;