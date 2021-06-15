import React from "react";
import Grid from "@material-ui/core/Grid";
//import AllTopic from "./ClassWorkTab/AllTopic";
import WorkMaterial from "./ClassWorkTab/WorkMaterial";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyle= theme=>({
    mainGrid: {
        marginTop: theme.spacing(1),
    },
    dispNone:{
        [theme.breakpoints.down('sm')]:{
            display:'none',
        }
    },
})

class ClassWorkTab extends React.Component {
    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <Grid container spacing={5} className={classes.mainGrid}>
                        {/*<AllTopics/>*/}

                        <WorkMaterial id={this.props.id}/>


                </Grid>
            </React.Fragment>
        )
    }
}
export default withStyles(useStyle)(ClassWorkTab)