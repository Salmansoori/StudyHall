import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[50],
        maxWidth:'300px',
        minHeight:'200px',
    },
    hideForSmall:{
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        }
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
}));
const sidebar = {
    title: 'Upcoming',
    description:'Woohoo, no work due soon!'

};
export default function Sidebar(props) {
    const classes = useStyles();
    const { description, title } = sidebar;

    return (
        <Grid item xs={12} md={4} className={classes.hideForSmall}>
            <Paper elevation={0} className={classes.sidebarAboutBox} >
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography>{description}</Typography>
                <Button color='primary'>
                    View all
                </Button>
            </Paper>
        </Grid>
    );
}