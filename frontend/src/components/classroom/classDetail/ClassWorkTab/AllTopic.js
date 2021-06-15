import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    sidebarSection: {
        marginTop: theme.spacing(1),
    },
    hideForSmall:{
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        }
    },
}));

const sidebar = {
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
    ],
};

export default function AllTopics(props) {
    const classes = useStyles();
    const { archives } = sidebar;

    return (
        <Grid item xs={12} md={4} className={classes.hideForSmall}>
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Archives
            </Typography>
            {archives.map((archive) => (
                <Link display="block" variant="body1" href={archive.url} key={archive.title}>
                    {archive.title}
                </Link>
            ))}
        </Grid>
    );
}