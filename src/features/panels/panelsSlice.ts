import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

// typescript FormState interface
export interface FormState { 
    fieldName  : string;
    fieldType  : string;
    offsetFrom : string;
    offsetTo   : string;
    fieldDescription : string;    
}

// typescript PanelObject interface
export interface PanelObject {
    panels : [FormState]
}
// redux store initial value object with type check
const initialState: PanelObject = {
    panels : [{
            fieldName  : "",
            fieldType  : "",
            offsetFrom : "",
            offsetTo   : "",
            fieldDescription : ""
        }]    
};

 

export const panelSlice = createSlice({
  name: 'panel',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPanel: (state, action) => {      

       let panels =  action.payload.length > 0 ? action.payload : [{
        fieldName  : "",
        fieldType  : "",
        offsetFrom : "",
        offsetTo   : "",
        fieldDescription : ""
       }];
       state.panels = panels;
       return state;
    }

  }, 
});

export const { addPanel } = panelSlice.actions;


export const getAllPanels = (state) => state;

/*
* This method is used to set panel when a new panel introduced by user
*/
export const setPanel = (formData : PanelObject): AppThunk => (
  dispatch,
  getState
) => {
  const stateObj = getAllPanels(getState());  
  if(
     stateObj &&
     stateObj.panelReducer !== undefined &&
     stateObj.panelReducer.panels !== undefined &&
     stateObj.panelReducer.panels !== null &&
     stateObj.panelReducer.panels.length > 0
     ){
         let oldState = stateObj.panelReducer.panels;         
         let tmpObj : any = [];
         oldState.map( (innerpanel : any) => {
            if(innerpanel.fieldName !==""){ tmpObj.push(innerpanel); }            
            return true;
         });     
         console.log("---inserted----", tmpObj);
         tmpObj.push(formData);  
         dispatch(addPanel(tmpObj));
     }
  
};

/**
 * This method is used to delete a panel from stores list
 */
export const removePanel = (index : number): AppThunk => (
  dispatch,
  getState
) => {
  const stateObj = getAllPanels(getState());  
  if(
     stateObj &&
     stateObj.panelReducer !== undefined &&
     stateObj.panelReducer.panels !== undefined &&
     stateObj.panelReducer.panels !== null &&
     stateObj.panelReducer.panels.length > 0
     ){
         let oldState = stateObj.panelReducer.panels;
         let tmpObj : any = [];
         oldState.map( (innerpanel : any) => {
            tmpObj.push(innerpanel);
            return true;
         });  
         if(tmpObj.length === 1){ dispatch(addPanel([])); }
         else{
          tmpObj.splice(index,1);                  
          dispatch(addPanel(tmpObj));
         }         
     }
  
};
//Below written method is used to update panels order in the redux store
export const updatePanel = (formData : any): AppThunk => ( dispatch,getState) => {  dispatch(addPanel(formData)); };
export default panelSlice.reducer;
