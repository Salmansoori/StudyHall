import axios from 'axios';
import React from 'react'
import { trackPromise } from 'react-promise-tracker';
import { authToken } from '../constant';
import { Redirect } from "react-router-dom";
import StreamTab from "./classDetail/StreamTab";
import ClassWorkTab from "./classDetail/ClassWorkTab";
import PeopleTab from "./classDetail/PeopleTab";
import Toolbar from "@material-ui/core/Toolbar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {Container} from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles";
//import Alert from "@material-ui/lab/Alert";

const useStyles = theme => ({
    toolbarTitle: {
        flex: 1,
        flexGrow: 1,
        maxWidth: 500,
        position: 'relative',
        marginTop: '-130px',
        marginInline:'auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: '0px',
        },
    },
})

class ClassDetails extends React.Component {

    val = {
        0: <StreamTab id={this.props.match.params.id} />,
        1: <ClassWorkTab id={this.props.match.params.id} />,
        2: <PeopleTab id={this.props.match.params.id} />,
    }
    constructor(props) {
        super(props);
        this.state = {
            body: <React.Fragment />,
            value: 0,
            isValid: true,
            error_msg: null,
        }
    }

    componentDidMount() {
        trackPromise(axios.get(`http://127.0.0.1:8000/${this.props.match.params.id}`, authToken))
            .then(response => {
                this.setState({
                    isValid: true,
                    body: <StreamTab id={this.props.match.params.id} />,

                })

            })
            .catch(error => {
                this.setState({ isValid: false, error_msg: error.response.data.detail })
            })
    }
    handleChange = (event, newValue) => {
        this.setState({ value: newValue, body: this.val[newValue] })
    };


    render() {
        const {classes} = this.props;
        
        if (this.state.isValid) {
            return (
                <div >
                    <Toolbar>
                            <div className={classes.toolbarTitle}>

                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    variant="fullWidth"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="icon label tabs example"
                                >
                                    <Tab label="Stream"/>
                                    <Tab label="Classwork"/>
                                    <Tab label="People"/>
                                </Tabs>

                            </div>
                        </Toolbar>
                        <Container>
                            {this.state.body}
                        </Container>
                </div>
            )
        }
        else {
            return (
                <Redirect to="/" msg={"Either Class is not valid or You are not loged in"} />
            )
        }
    }
}

export default withStyles(useStyles)(ClassDetails);