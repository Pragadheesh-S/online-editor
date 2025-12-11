import React, { useState, useEffect } from 'react';

function Editor() {
  const [text, setText] = useState('');

  // Load saved content from Local Storage
  useEffect(() => {
    const saved = localStorage.getItem('task3EditorContent');
    if (saved) setText(saved);
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
    localStorage.removeItem('task3EditorContent');
  };

  const handleSave = () => {
    localStorage.setItem('task3EditorContent', text);
    alert('Content saved!');
  };

  const applyFormat = (format) => {
    const selectedText = window.getSelection().toString();
    if (!selectedText) return alert('Select text to format');

    let formatted = selectedText;
    if (format === 'bold') formatted = `**${selectedText}**`;
    if (format === 'italic') formatted = `*${selectedText}*`;
    if (format === 'underline') formatted = `__${selectedText}__`;

    setText(text.replace(selectedText, formatted));
  };

  return (
    <div style={{ margin: '20px' }}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type your text here..."
        style={{ width: '100%', height: '200px', fontSize: '16px' }}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => applyFormat('bold')}>Bold</button>
        <button onClick={() => applyFormat('italic')}>Italic</button>
        <button onClick={() => applyFormat('underline')}>Underline</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave}>Save</button>
      </div>

      <h3>Preview:</h3>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '100px',
          whiteSpace: 'pre-wrap',
          fontSize: '16px',
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default Editor;
