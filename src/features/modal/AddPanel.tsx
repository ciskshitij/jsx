import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useAppDispatch } from '../../app/hooks';
import { setPanel } from "../panels/panelsSlice";
import 'react-responsive-modal/styles.css';

import "./Modal.css";

export default function CustomModal(props){
    /*
    * State initialization
    */
    const [formData, setFormData] = useState({
        fieldName  : "",
        fieldType  : "",
        offsetFrom : "",
        offsetTo   : "",
        fieldDescription :""
    });    
    const [error, setError] = useState('');

    //redux dispatch method
    const dispatch = useAppDispatch();
  

    /*
     * Below event handler will update the 
     * state values based on form field 
    */
    const changeEvent = (e) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
    }
 

    /**
     * Below written function will check the form data
     * And process the data for next steps
     */
    const handleFormSubmit = () => {
       const { fieldName, fieldType, offsetFrom, offsetTo } = formData;
       //Check if any value is empty from required fields
       if( fieldName === "" ||
           fieldType === "" ||
           offsetFrom === "" ||
           offsetTo === ""
            ){ setError("All the fields marked with * are required.");}
       else { 
         setError("");                 
         dispatch( setPanel(formData) );
         setFormData({
          fieldName  : "",
          fieldType  : "",
          offsetFrom : "",
          offsetTo   : "",
          fieldDescription :""
        })
        }

    }


  return (         
      <Modal
        open={props.open}
        onClose={props.setOpen}
        center
        classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
        }} >
        <h2 className="modal-head">Field Declaration</h2>
        <div className="declaration-form">

            <div className="field-group">
                    <label><span>*</span>Field name</label>
                    <input
                     type="text"
                     className="input text-feld"
                     placeholder="Field Name"
                     name="fieldName"
                     onChange={(e)=>changeEvent(e)}
                    />
            </div>

            <div className="field-group">
                    <label><span>*</span>Type</label>                    
                     <select
                       name="fieldType"
                       onChange={(e)=>changeEvent(e)}
                     >
                         <option value="">--</option>
                         <option value="number">Number</option>
                         <option value="string">String</option>
                     </select>
            </div>

            <div className="field-group">
                    <label><span>*</span>Offset</label>                    
                    <div className="field-group-half">
                        <label>From</label>  
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          className="input text-feld"
                          name="offsetFrom"
                          onChange={(e)=>changeEvent(e)}
                        />
                    </div>
                    <div className="field-group-half">
                        <label>To</label>  
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          className="input text-feld"
                          name="offsetTo"
                          onChange={(e)=>changeEvent(e)}
                        />
                    </div>
            </div>

            <div className="field-group margin-top">
                <label>Description</label>
                <textarea
                  className="input-textarea"
                  placeholder="Add Description"
                  name="fieldDescription"
                  onChange={(e)=>changeEvent(e)}
                >
                </textarea>
            </div>


            <div className="field-group btn-group">
                <p className="error-text">{error}</p>
                <button className="cancelBtn" onClick={()=>props.setOpen(false)}>Cancel</button>
                <button className="saveBtn" onClick={(e)=>handleFormSubmit()}>Save</button>
            </div>


        </div>
      </Modal>    
  );
};