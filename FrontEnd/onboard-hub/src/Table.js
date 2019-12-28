import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';  
import { Link } from 'react-router-dom'; 
class Table extends Component {  
    constructor(props) {  
        super(props);  
        }  
        DeleteStudent= () =>{  
         axios.delete('http://localhost:52564/Api/Student/Deletestudent?id='+this.props.obj.Id)  
        .then(json => {  
        if(json.data.Status==='Delete'){  
        alert('Record deleted successfully!!');  
        }  
        })  
        }  
        render() {  
            return (  
                <tr>  
                  <td>  
                    {this.props.obj.FirstName}  
                  </td>  
                  <td>  
                    {this.props.obj.DOJ}  
                  </td>  
                  <td>  
                    {this.props.obj.JobTitle}  
                  </td>  
                  <td>  
                    {this.props.obj.Department}  
                  </td>  
                  <td>  
                  <Link to={"/edit/"+this.props.obj.Id} className="btn btn-success">Edit</Link>  
          </td>  
          <td>  
            <button type="button" onClick={this.DeleteStudent} className="btn btn-danger">Delete</button>  
                  </td>  
                </tr>  
            );  
          }  
    }  
  
export default Table;
                  