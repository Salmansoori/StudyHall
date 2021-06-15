import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom:'10px',
        '&:hover':{
            background:'#E8F0FE',
        }
    },
    avatar: {
        backgroundColor: red[500]
    }
}));

export default function WorkItem(props) {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.title.toUpperCase().charAt(0)}
                    </Avatar>
                }
                title={props.title}
            />
        </Card>
    );
}