import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={EmployeeList} />
                        <Route path="/users" component={EmployeeList} />
                        <Route path="/add-user" component={AddEmployee} />
                        <Route path="/edit-user" component={EditEmployee} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;