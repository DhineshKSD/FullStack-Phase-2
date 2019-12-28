import React, { Component } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom';  
import ButtonMat from '@material-ui/core/Button';
class Table extends Component {  
  constructor(props) {  
    super(props);  
    }  
    DeleteStudent= () =>{  
     axios.delete('https://localhost:44319/api/removeEmployee/'+this.props.obj.Employee_id)  
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
          <Link to={"/edit/"+this.props.obj.Employee_id} style={{ textDecoration: 'none' }}><ButtonMat variant="contained" color="Primary">Edit</ButtonMat></Link>  
          </td>  
          <td>  
          <ButtonMat type="button" onClick={this.DeleteStudent} variant="contained" color="secondary">Delete</ButtonMat>  
          </td>  
        </tr>  
    );  
  }  
}  
export default Table;