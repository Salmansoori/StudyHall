import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import {authToken} from "../../../constant";
import {trackPromise} from "react-promise-tracker";
import {Link} from "@material-ui/core";

const useStyles = theme => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        maxHeight:'300px'

    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
})


class HeroImg extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            classDetail:{},
        }

    }
    componentDidMount() {
        trackPromise(axios.get(`http://127.0.0.1:8000/${this.props.id}`,authToken)
            .then(response => {
                this.setState({
                    classDetail:response.data,
                })
            })
            .catch(error =>{
            }))
    }

    render() {
        const {classes} = this.props;
        const {classDetail} = this.state

        let section;
        if(classDetail.section)
        {
            section = <Typography>
                Section: {classDetail.section}
            </Typography>
        }
        else{
            section = <React.Fragment/>
        }
        let MeetUrl;
        if(classDetail.meetUrl)
        {
            MeetUrl =<React.Fragment> <Typography variant="caption" display="block">
                Meet url: <Link href={classDetail.meetUrl}>{classDetail.meetUrl}</Link>
            </Typography></React.Fragment>
        }
        else{
            MeetUrl = <React.Fragment/>
        }
        return (
            <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${'https://source.unsplash.com/random'})`}}>
                {/* Increase the priority of the hero background image */}
                <div className={classes.overlay}/>
                <Grid container>
                    <Grid item md={6}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {classDetail.class_name}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {classDetail.subject}
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Class Code {classDetail.class_code}
                            </Typography>
                            {section}
                            {MeetUrl}
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(HeroImg);