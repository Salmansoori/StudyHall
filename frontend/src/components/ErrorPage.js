import React from 'react'
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export function ErrorPage(props){
    if(props.status>300 ||props.status<200) {
        return (
            <React.Fragment>
                <Alert severity="error">
                    <AlertTitle>Error Occured : {props.status}</AlertTitle>
                    {props.message}
                </Alert>
            </React.Fragment>
        )
    }
    else{
        return (<React.Fragment/>)
    }
}

export default ErrorPage;