import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from "@material-ui/core/Grid";
import { ReactTinyLink } from "react-tiny-link";
import {Divider} from "@material-ui/core";
import {Send,} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import PostComments from "./PostComments";
import {authToken} from "../../../constant"
import {trackPromise} from "react-promise-tracker";
import CreateClassPost from "./CreateClassPost";
const useStyles = theme => ({
    root: {
    marginBottom:theme.spacing(2),
    },
    avatar: {
        backgroundColor: red[500],
    },
})
class ClassPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassPosts:[],
            ShareWithClass: this.renderSharePost,
            postComment:"",
        }
    }
    componentDidMount() {
        trackPromise(axios.get(`http://127.0.0.1:8000/posts/?class_id=${this.props.id}`,authToken)
            .then(response => {
                this.setState({
                    ClassPosts:response.data,
                })
            })
            .catch(error =>{
            }))
    }
    onSubmit=(e,id)=>{
        e.preventDefault();
        const CreateCommentData = { post_comment:this.state.postComment};
        axios.post(`http://127.0.0.1:8000/createpostcomment/?class_id=${this.props.id}&post_id=${id}`, CreateCommentData,authToken)
            .then(response => {
                window.location.reload(false);
                this.setState({
                })
            }).catch(error => {
            this.setState({
            })
        })
    }
    renderTinyUrl(url)
    {
        if(url)
        {
            return <React.Fragment>
                <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={url}

                />
            </React.Fragment>
        }
        else{
            return <React.Fragment/>
        }
    }
    render() {
        const {classes} = this.props;
        const {ClassPosts} = this.state;

        return (
            <Grid item xs={12} md={8}>
                <CreateClassPost id={this.props.id}/>

                {ClassPosts.map((post, index) => (
                    <Card className={classes.root} key={index}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {post.username.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={post.username}
                            subheader={post.updated}

                        />
                        <CardContent>
                            <Typography color="textPrimary" >
                                {post.post_title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.post_description}
                            </Typography>
                            <br/>
                            {this.renderTinyUrl(post.post_attachment_url)}
                            {/* Comment section */}
                            <PostComments post_id={post.id} class_id={this.props.id}/>
                            <Divider style={{marginTop: '20px'}}/>
                            <Grid container spacing={1} justify='space-around'
                                  style={{marginTop: '10px'}}>
                                <Grid item xs={2}>
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {localStorage.getItem('username').charAt(0).toUpperCase()}
                                </Avatar>
                                </Grid>
                                <Grid item xs>
                                <form onSubmit={(e)=>this.onSubmit(e,post.id)}>

                                <TextField
                                    id={index+"input"}
                                    variant='outlined'
                                    placeholder="Add a Class Comment"
                                    style={{width: '80%',}}
                                    required
                                    onChange={e => {this.setState({postComment: e.target.value})}}


                                />
                                <IconButton type="submit">
                                    <Send/>
                                </IconButton>
                                </form>
                                </Grid>

                            </Grid>
                        </CardContent>

                    </Card>
                ))}
            </Grid>

        );
    }
}
export default withStyles(useStyles)(ClassPost);