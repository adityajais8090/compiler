import './App.css';
import React from 'react';
import Editor from "@monaco-editor/react";
//import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { useState } from 'react';
import axios from 'axios';

const CodeEditorWindow = ({ language, code, theme }) => {
  const initialCode = `
  // Your First C++ Program

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}

  `;
  const [code, setCode] = useState(initialCode);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  

  const resetCode = () => {
    setCode(initialCode);
  };

  const handleSubmit = () => {
    try{

    }catch(err){
      console.log(err.response);
    }
  }
  
  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code,
      input,
    };

    try {
      const {data} = await axios.post('http://localhost:5000/run', payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
      console.log("here is my response : " , data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="app">
      <h1>Code Editor</h1>
      <div className="header-buttons">
        <button onClick={resetCode}><i className="fas fa-redo-alt"></i> Reset</button>
        <button onClick={() => setShowNotes(!showNotes)}><i className="fas fa-sticky-note"></i> Notes</button>
      </div>
      <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "cpp"}
        value={code}
        onValueChange={(code) => setCode(code)}
        theme={theme}
      />
    </div>
     {/* <div className="editor-container">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            minHeight: '200px',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        />
      </div> */}
      <div className="io-section">
        <div className="input-section">
          <h2>Input</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here..."
            style={{ width: '100%', height: '50px' }}
          />
        </div>
        <div className="output-section">
          <h2>Output</h2>
          <textarea
            value={output}
            readOnly
            placeholder="Output will be displayed here..."
            style={{ width: '100%', height: '50px' }}
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleRun}><i className="fas fa-play"></i> Run</button>
        <button onClick={handleSubmit}><i className="fas fa-paper-plane"></i> Submit</button>
      </div>
      {showNotes && (
        <div className="notes-section">
          <h2>Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your notes here..."
            style={{ width: '100%', height: '100px' }}
          />
        </div>
      )}
    </div>
  );
}


export default App;
