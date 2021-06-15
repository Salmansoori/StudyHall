import React from "react";
import { Link } from "react-router-dom";

class HomePageLayout extends React.Component {
  render()
  {
    return(
    <>

     {/* jumbotron */}
     <div className="container mt-4">
     <div className="jumbotron text-center">
       <h1>Welcome to StudyHall</h1>
       <p className="lead">This is a Study webApp which build in Python Django framework and Reactjs</p>
       <Link to="/register" className="btn btn-success btn-lg m-2">Register</Link>
       { localStorage.getItem('token') ? <h1>Hi {localStorage.getItem('username') } </h1>:
       <Link to="/login" className="btn btn-success btn-lg">Login</Link>}
       <p className="lead">StudyHall enables teachers to create an online classroom area in <br/>
                           which they can manage all the documents that their student need.<br /> Hope you get interested this app.</p>
     </div>
   </div>

  </>
  )
  }
}
  export default HomePageLayout;