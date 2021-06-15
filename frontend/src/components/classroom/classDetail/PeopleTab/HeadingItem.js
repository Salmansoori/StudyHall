import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom:'10px',
        color:'#1967D2',
        '&:hover':{
            background:'#E8F0FE',
        }
    },
}));

export default function WorkItem(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <Typography color='textSecondary' style={{marginTop:'10px',marginRight:'10px'}}>
                        {props.total}
                    </Typography>
                }
                title={props.title}
            />
        </Card>
    );
}