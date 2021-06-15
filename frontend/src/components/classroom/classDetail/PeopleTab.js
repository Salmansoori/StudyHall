import React from "react";
import Grid from "@material-ui/core/Grid";
import People from "./PeopleTab/People"
import {Container} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
const useStyle=theme=>({
    mainGrid: {
        marginTop: theme.spacing(1),
    },
    dispNone:{
        [theme.breakpoints.down('sm')]:{
            display:'none',
        }
    },
})

class PeopleTab extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Container maxWidth='md'>
                    <Grid container spacing={5} className={classes.mainGrid}>
                        <Grid item xs>
                            <People id={this.props.id}/>

                        </Grid>

                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}
export default withStyles(useStyle)(PeopleTab);