import React from 'react';
import { Panels } from './features/panels/Panels';
import { Editor } from './features/editor/Editor';
import './App.css'; 

function App() {
  return (
    <div className="App">
      {/* Left panel section component */}
      <Panels/>
      {/* Editor and the right bar to open and close it */}
      <Editor/>   
    </div>
  );
}

export default App;
