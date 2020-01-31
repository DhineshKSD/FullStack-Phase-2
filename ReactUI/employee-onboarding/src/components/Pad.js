import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import axios from 'axios'; 
import '../Pad.css';
import Fab from '@material-ui/core/Fab';
import ButtonMat from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

var id=localStorage.getItem('User');
 function Pad() {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = (e) =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    localStorage.setItem('Sign',imageURL)
     
  const Post = (e)=>{  
    axios.post('https://localhost:44319/api/PostImage/'+id,{DocumentCode:'S1',DocumentPath:'NIL',DocumentDescription:'Signature',DocumentType:'Image',Data:imageURL})  
                .then(json => {  
                  
                })  
                .catch(function (error) {  
                  console.log(error);  
                });}
  return (
    <div className="Pad">
      <Popup
        modal
        trigger={<Fab variant="extended" id="signpad"color="primary" size="small"> Open Signature Pad </Fab>}
        closeOnDocumentClick={false}
      >
        {close => (
          <>
          <button id="b4" size="small" variant="round" onClick={close}><CancelIcon id="cicon"/></button>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            {/* Button to trigger save canvas image */}
            <ButtonMat id="b1" variant="contained" onClick={save}>Trim</ButtonMat>
            <ButtonMat id="b2" variant="contained" onClick={Post}>Set</ButtonMat>
            <ButtonMat id="b3" variant="contained" onClick={clear}>Clear</ButtonMat>
            
          </>
        )}
      </Popup>
      <br />
      <br />
      {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
      {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px"
          }}
        />
      ) : null}
    </div>
  );
}
export default Pad;