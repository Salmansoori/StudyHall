import React from 'react';
import {Route} from 'react-router-dom';
import Login from "./components/authentication/Login";
import Register from './components/authentication/Register';
import HomePageLayout from "./components/Home";
import Profile from "./components/Profile";
import Hoc from "./Hoc/Hoc";
import Classroom from "./components/classroom/Classroom";
import ClassDetails from './components/classroom/ClassDetails';

const BaseRouter = () => (
    <Hoc>
      <Route path="/profile" component={Profile} />
      <Route path="/classroom" component={Classroom} />
      <Route path="/detail/:id" component={ClassDetails} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/" component={HomePageLayout} />
    </Hoc>
  );
  
export default BaseRouter;