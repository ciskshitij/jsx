import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getAllPanels } from "../panels/panelsSlice";
import styles from '../panels/Panels.module.css';

export function Editor() {  
  const [editor, setEditor] = useState(true);
  const [panelHTML, setPanelHTML] = useState();
  const panelData = useAppSelector(getAllPanels);   

  /*
  * Once the updated panels list received from store
  * Here we will process them to display in view  
  */
  useEffect(()=>{
    console.log("----editor------",panelData);
    if( panelData &&
        panelData.panelReducer !== undefined &&
        panelData.panelReducer.panels !== undefined &&
        panelData.panelReducer.panels.length >= 0
        ) {
      
      let itemsFromBackends:any = [];
      panelData.panelReducer.panels.forEach((value)=>{        
        if( value.fieldName !== ""){
          itemsFromBackends.push({
            id: value.fieldName,
            type: value.fieldType === "number" ? "NumberFieldSpec" : "StringFieldSpec",
            constraints: {},
            label: value.fieldName,
            offsetExpression :{
              type: "StaticOffsets",
              starts: value.offsetFrom,
              end: value.offsetTo
            },            
            description: value.fieldDescription
          });   
        }
      });

      // if we have any panels in the redux-store, then set them to retrive
      if(itemsFromBackends){
        let tempobj = {
          header: itemsFromBackends,
          body: {}
        };        
        setPanelHTML(tempobj);
      }
    }    
  },[panelData])
  
  return ( 
    <div className={styles.editor_main_div}>     

      {/* main canvas element which will hold a body with draggable panels*/}
      { editor &&
      <div className={styles.canvas}>
          <div className={styles.canvas_header}>
            <p className={styles.header_label}>Editor</p>
            <span className={styles.editor_cross} onClick={()=>setEditor(false)}>x</span>
          </div>
          <div className={styles.editor_body}>
            <pre className={styles.pre_class}>{JSON.stringify( panelHTML,null,2)}</pre>
          </div>
      </div>
}

      <div className={styles.right_bar}>

          <button className={styles.right_section_btn} onClick={()=>setEditor(!editor)}>
            Editor
          </button>

      </div>

    </div>
  );
}
