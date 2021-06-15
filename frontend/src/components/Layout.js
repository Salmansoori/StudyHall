import React from 'react'
import { Link } from "react-router-dom";
import CreateJoin from "./classroom/CreateJoin";
class CustomLayout extends React.Component {
  render() {

    let footerStyle={
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      width: "100%",
      height: "60px",
      backgroundColor: "#e3f2fd",
    }

    return (
<>
  <div>
    {/*navbar*/}  
    <nav className="navbar navbar-expand-lg navbar-light rounded" style={{"background-color": "#e3f2fd"}}>
      <Link className="navbar-brand" to="/">StudyHall</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item active">
          {this.props.isAuthenticated ?
          <Link to="/classroom" className="nav-link">classroom</Link>:
          ""
          }
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        { this.props.isAuthenticated ?
            <button type="button" className="btn btn-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            </button> 
            : "" }
        </li>
        <li className="nav-item ml-3">
          { this.props.isAuthenticated ?
          <Link className="nav-link btn btn-info btn-md" to="/Profile">Profile</Link>
          : <Link to="/login/" className="btn btn-success btn-md">Login</Link>}
        </li>
      </ul>
    </nav>

  <div>
    {this.props.children}
  </div>  

  {/* footer */}
  <footer className="text-dark py-3" style={footerStyle}>
           <p className="text-center">
           @Copyright &copy; StudyHall.com
           </p>
   </footer>


   {/*  Modal  */}

     <CreateJoin />
   
    </div>
  </>
    )
  }
}

export default CustomLayout; 