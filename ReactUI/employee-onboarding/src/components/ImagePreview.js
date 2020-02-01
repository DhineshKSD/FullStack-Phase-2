import React from 'react';
import PropTypes from 'prop-types';
import '../preview.css';
import ButtonMat from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 
import axios from 'axios'; 

var id=localStorage.getItem('User');
var uri=localStorage.getItem('photo');


export const ImagePreview = ({ dataUri, isFullscreen }) => {
  let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : '';
  
  return (
    <div className={'demo-image-preview ' + classNameFullscreen}>
      <img src={dataUri} />
      <Link to={'/PersonalInfo'} style={{ textDecoration: 'none' }}><ButtonMat variant="contained" color="primary" id="photosave" onClick={(e)=>axios.post('https://localhost:44319/api/PostPhoto/'+id,{ProofCode:'P1',ProofName:'Photo',ProofId:dataUri})  
                .then(json => {  
                  
                })  
                .catch(function (error) {  
                  console.log(error);  
                })}>Save</ButtonMat></Link> 
      <ButtonMat variant="contained" color="secondary" id="photoretake" onClick={(e)=>window.location.reload()}>Retake</ButtonMat> 
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool
};

export default ImagePreview;