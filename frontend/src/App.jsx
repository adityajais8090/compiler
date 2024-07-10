import './App.css';
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
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
  const [stderr, setStderr] = useState('');

  const resetCode = () => {
    setCode(initialCode);
  };

  const handleSubmit = () => {
    // Implement submit functionality here if needed
  };

  const handleRun = async () => {
    const payload = {
      language: 'cpp',
      code,
      input,
    };

    try {
      const response = await axios.post('https://cpp-compiler-1-0-1.onrender.com/run', payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Here is my response:", response.data);
      setOutput(response.data.output);
      setStderr(''); // Clear any previous errors
    } catch (err) {
      console.log("Here is my error : " , err.response);
      setStderr(err.response.data.error.error || err.message || "Unknown error occurred"); // Set stderr state
    }
  };

  return (
    <div className="app">
      <h1>Code Editor</h1>
      <div className="header-buttons">
        <button onClick={resetCode}><i className="fas fa-redo-alt"></i> Reset</button>
        <button onClick={() => setShowNotes(!showNotes)}><i className="fas fa-sticky-note"></i> Notes</button>
      </div>
      <div className="editor-container">
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
      </div>
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
        {!stderr && (
          <div className="output-section">
            <h2>Output</h2>
            <textarea
              value={output}
              readOnly
              placeholder="Output will be displayed here..."
              style={{ width: '100%', height: '50px' }}
            />
          </div>
        )}
        {stderr && (
          <div className="output-section">
            <h2>Error</h2>
            <textarea
              value={stderr}
              readOnly
              placeholder="Error will be displayed here..."
              style={{ width: '100%', height: '50px' }}
            />
          </div>
        )}
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
