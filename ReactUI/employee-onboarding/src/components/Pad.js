import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import axios from 'axios'; 
import '../Pad.css';
import Fab from '@material-ui/core/Fab';

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
        trigger={<Fab variant="extended" color="primary" size="small"> Open Signature Pad </Fab>}
        closeOnDocumentClick={false}
      >
        {close => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            {/* Button to trigger save canvas image */}
            <button onClick={save}>Set</button>
            <button onClick={Post}>Save</button>
            <button onClick={clear}>Clear</button>
            <button onClick={close}>Close</button>
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