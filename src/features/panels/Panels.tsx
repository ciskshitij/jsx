import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllPanels, removePanel, updatePanel } from "./panelsSlice";
import CustomModal from "../modal/AddPanel";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from './Panels.module.css';

export function Panels() {
  /**
   * Initialize state and required variables
   */
   const [open, setOpen] = useState(false);
   const [columns, setColumns] = useState({});
   const panelData = useAppSelector(getAllPanels);  

  //redux dispatch method
  const dispatch = useAppDispatch();
 
  /*
  * Once the updated panels list received from store
  * Here we will process them to display in view  
  */
  useEffect(()=>{
    //first check the variable
    if( panelData &&
        panelData.panelReducer !== undefined &&
        panelData.panelReducer.panels !== undefined &&
        panelData.panelReducer.panels.length > 0
        ) {
      //close the add modal if open    
      setOpen(false);
      //temporary array for holding loop returned data
      let itemsFromBackends:any = [];
      //loop through all the store panels
      panelData.panelReducer.panels.forEach((value)=>{        
        if( value.fieldName !== ""){          
          itemsFromBackends.push({
            id: value.fieldName,
            fieldName: value.fieldName,
            fieldType: value.fieldType,
            offsetFrom: value.offsetFrom,
            offsetTo: value.offsetTo,
            fieldDescription: value.fieldDescription
          });   
        }
      });
  
      var columnsFromBackend = {
          "panels": {
              name: "",
              items: itemsFromBackends
          }
      };
      setColumns(columnsFromBackend);

    }    
  },[panelData])




  /**
   * Below is drag and drop package method 
   * which allow us to sort the panels into the view
   */
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;  
    
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      
      //set dragged column
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });

      //set the panel data in redux store
      dispatch( updatePanel(copiedItems) );
    
  };

  /**
   * Below method is used to remove panel from specific
   *  index of store array
   */
  const removeThisPanel = (index) => {    
    console.log("---remove----", index);
    //redux store remove panel
    dispatch( removePanel(index) );
  }
  
  return ( 
    <div className={styles.panel_main_div}>     

      {/* main canvas element which will hold a body with draggable panels*/}
      <div className={styles.canvas}>
          {/*  canvas header*/}
          <div className={styles.canvas_header}>
            <p className={styles.header_label}>Canvas</p>
          </div>
          {/*  canvas body*/}
          <div className={styles.canvas_body}>
              <div className={styles.canvas_panel_left}>
                    <div className={styles.left_inner}>

                      {/* drag & drop and inner panels code here start*/}
                      <div  className={styles.drag_holder}>      
                        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)} >

                          {Object.entries(columns).map(([columnId, column]:any, index: any) => {
                            return (
                              <div className={styles.drag_inner_div} key={columnId} >              
                                <div>
                                

                                  <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                          className={styles.panel_holder}                        
                                        >
                                          {column.items.map((item, index) => {
                                            return (
                                              <Draggable key={item.id} draggableId={item.id} index={index} >
                                                {(provided, snapshot) => {
                                                  return (
                                                    <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      className={styles.inner_panels}
                                                      style={{                                      
                                                        ...provided.draggableProps.style
                                                      }}
                                                    > 
                                                      <div className={styles.drag_icon}><img src="./drag.png" alt="drag-icon"/></div>
                                                      <div className={styles.field_name}>{item.fieldName}</div>
                                                      <div className={styles.field_offset}>
                                                          {item.offsetFrom}:{item.offsetTo}
                                                          ({(item.offsetTo-item.offsetFrom)+1})
                                                      </div>
                                                      <div className={styles.close_icon}><img src="./close.png" style={{cursor:"pointer"}} onClick={(e)=>removeThisPanel(index)} alt="close-icon"/></div>
                                                    </div>
                                                  );
                                                }}
                                              </Draggable>
                                            );
                                          })}
                                          {provided.placeholder}
                                        </div>
                                      );
                                    }}
                                  </Droppable>
                                </div>
                              </div>
                            );
                          })}
                        </DragDropContext>
                      </div>
                      {/* drag & drop and inner panels code here endS*/}

                    </div>
              </div>
              <div className={styles.canvas_panel_right}>
                    <p className={styles.inner_rotate_label}>Header</p>
                    <button className={styles.right_bottom_button} onClick={()=>setOpen(true)}>+</button>
              </div>
          </div>
      </div>

    {/* 
      Below is a Modal to create entries
    */}

    <CustomModal
      open={open}
      setOpen={()=>setOpen()}
    />

    </div>
  );
}
