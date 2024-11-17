// src/App.js
import React from 'react';
import KanbanBoard from './KanbanBoard';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}> Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;