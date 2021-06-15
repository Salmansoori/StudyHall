import React from 'react'
import WorkItem from "./WorkItem";
import HeadingItem from "./HeadingItem";



export default class WorkMaterials extends React.Component {
    render() {
        return (
            <div>
                <HeadingItem title="All Posts With Attachment"/>
                <WorkItem id={this.props.id}
                />


            </div>
        )
    }
}