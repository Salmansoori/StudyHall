import React from "react";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import {ReactTinyLink} from "react-tiny-link";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import {authToken} from "../../../constant";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import {trackPromise} from "react-promise-tracker";

const useStyles = theme => ({
    // root: {
    //     marginBottom:'10px',
    //
    // },
    root: {
        width: '100%',
        '&:hover':{
            background:'#E8F0FE',
        }
    },
    heading: {
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    avatar: {
        backgroundColor: red[500]
    }
})

class WorkItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassPosts:[],
            expanded:false,
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
    renderOnlyAttachmentposts(post,index){
        const {classes} = this.props;
        const handleChange = (panel) => (event, isExpanded) => {
            this.setState({expanded:isExpanded ? panel : false});
        };
        if(post.post_attachment_url){
            return(
                <React.Fragment >
                    <Accordion expanded={this.state.expanded === index} onChange={handleChange(index)}  className={classes.root}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography  variant="h6" component="p" className={classes.heading}>{post.post_title}</Typography>
                            <Typography className={classes.secondaryHeading}>posted on {post.updated.toString().slice(0,10)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" component="p">
                                {post.post_description}
                            </Typography>
                        </AccordionDetails>

                        <AccordionDetails>

                            {this.renderTinyUrl(post.post_attachment_url)}
                        </AccordionDetails>


                    </Accordion>
                </React.Fragment>
            )
        }
        else{
            return(<React.Fragment/>)
        }
    }
    render() {
        const {ClassPosts} = this.state;


        return (<React.Fragment>
            {ClassPosts.map((post, index) => (
                <React.Fragment key={index}>
                    {this.renderOnlyAttachmentposts(post,index)}
                </React.Fragment>
                ))}
            </React.Fragment>
        );
    }
}
export default withStyles(useStyles)(WorkItem);