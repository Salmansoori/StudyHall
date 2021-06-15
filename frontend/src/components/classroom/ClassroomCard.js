import React from 'react';
import { Link } from "react-router-dom";

export default function ClassroomCard({ cId, cName, cSection, cSubject }) {
    return (
        <>
            <div className="card ml-3" style={{"width":"18rem"}}>
                <img className="card-img-top" src="https://source.unsplash.com/daily" alt="Card top"/>
                    <div className="card-body">
                        <Link to={"/detail/"+ cId }>
                        <h3 className="card-title">{cName}</h3>
                        </Link>
                        <h4 className="card-subtitle">Subject: {cSubject}</h4>
                        <p className="card-text">Section: {cSection}</p>
                    </div>
            </div>
        </>
    )
}