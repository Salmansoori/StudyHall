import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title}
            />
        </Card>
    );
}