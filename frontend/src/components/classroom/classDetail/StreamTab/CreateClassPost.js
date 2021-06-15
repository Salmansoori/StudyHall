import React, {Component} from 'react'
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {red} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import {Card, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import {authToken} from "../../../constant";
//import {ErrorMessage} from "../../misc/CreateJoin/JoinClass";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
const CreateFields=[
    'title',
    'description',
    'attachmentUrl',
]

const useStyles = theme => ({
    root: {
        marginBottom:theme.spacing(2),
    },
    avatar: {
        backgroundColor: red[500],
    },
})


class CreateClassPost extends Component
{
    constructor(props) {
        super(props);
        this.state={
            open:false,
            title:"",
            description:"",
            attachmentUrl:"",
            status:200,
        }
    }
    handleClickOpen = () => {
        this.setState({open:true})
    };

    handleClose = () => {
        this.setState({open:false})

    };
    onSubmit = e => {
        e.preventDefault();
        const CreatePostData = { post_title:this.state.title,
            post_description:this.state.description,
            post_attachment_url:this.state.attachmentUrl,};
        axios.post(`http://127.0.0.1:8000/createpost/?class_id=${this.props.id}`, CreatePostData,authToken)
            .then(response => {
                window.location.reload(false);
                this.setState({
                    status:response.status,
                    open:false,
                })
            }).catch(error => {
            this.setState({
                status:error.response.status,
            })
        })
    }

    render() {
        const {classes} = this.props;
        return(
            <React.Fragment>
                <Card style={{marginBottom:'10px'}}>
                <Grid >
                    <Button onClick={this.handleClickOpen} style={{width: '100%',}}>

                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {localStorage.getItem('username').charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography variant='body2' component={"p"} color={"textSecondary"}
                                style={{width: '92%',}}> Share Something with Your Class </Typography>
                    </Button>
                </Grid>
                </Card>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                   {/* <ErrorMessage status={this.state.status} message={"Fill all field correctly"}/> */}
                    <form style={{width:'100%'}}
                          onSubmit={this.onSubmit}
                          noValidate
                    >
                        <DialogContent>

                            <DialogContentText>
                                Post an Update
                            </DialogContentText>



                            {CreateFields.map((CreateField) => (  <TextField
                                key={CreateField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id={CreateField}
                                label={CreateField}
                                name={CreateField}
                                autoComplete={CreateField}
                                onChange={e => {this.setState({[`${CreateField}`]: e.target.value})}}

                            />))}
                        </DialogContent>
                        <DialogActions>
                            <Button  type="submit"
                                     fullWidth
                                     variant="contained"
                                     color="primary">
                                Post
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        )
    }
}
export default withStyles(useStyles)(CreateClassPost);