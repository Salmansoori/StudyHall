import React from "react";
import HeroImg from "./StreamTab/HeroImg";
import Grid from "@material-ui/core/Grid";
import ClassPosts from "./StreamTab/ClassPosts";
import Notices from "./StreamTab/Notices";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyle= theme=>({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
})

class StreamTab extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <HeroImg id={this.props.id}/>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <Notices id={this.props.id}/>
                    <ClassPosts id={this.props.id}/>
                </Grid>
            </React.Fragment>
        )
    }
}
export default withStyles(useStyle)(StreamTab);