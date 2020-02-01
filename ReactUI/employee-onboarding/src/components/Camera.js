import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios'; 


import ImagePreview from '../components/ImagePreview'; // source code : ./src/demo/AppWithImagePreview/ImagePreview

function Camera1 (props) {
  const [dataUri, setDataUri] = useState('');

  function handleTakePhotoAnimationDone (dataUri) {
    setDataUri(dataUri);
    localStorage.setItem('photo',dataUri);
    /*axios.post('https://localhost:44319/api/PostPhoto/'+id,{ProofCode:'P1',ProofName:'Photo',ProofId:dataUri})  
                .then(json => {  
                  
                })  
                .catch(function (error) {  
                  console.log(error);  
                });*/
  }

  const isFullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
          />
          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isFullscreen}
          />
      }
    </div>
  );
}

export default Camera1;