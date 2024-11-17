import React, { useEffect, useState } from 'react';
import './KanbanBoard.css';
import axios from 'axios';
const handleAdd = (columnTitle) => {
  console.log(`Add task to ${columnTitle} column`);
  // Implement logic for adding a task
};

const handleMore = (columnTitle) => {
  console.log(`More actions for ${columnTitle} column`);
  // Implement logic for more options
};


const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
    <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
    <path d="M3 4h18M3 12h18M3 20h18" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FeatureIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
    <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" />
  </svg>
);

const KanbanBoard = () => {
  const [showEmptyLanes, setShowEmptyLanes] = useState(true);
  const [displayOpen, setDisplayOpen] = useState(false);
  const [groupBy, setGroupBy] = useState(localStorage.getItem("groupBy") || "status");
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [userFilter, setUserFilter] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const [tickets, setTickets] = useState(null);

  // Declare columns first
  const columns = [
    {
      title: "Planning",
      items: [
        { id: "CAM-5", title: "Add Multi-Language Support...", tag: "Feature Request" },
        { id: "CAM-8", title: "Create Onboarding Tutorial...", tag: "Feature Request" },
      ],
    },
    {
      title: "Todo",
    
      items: [
        { id: "CAM-4", title: "Add Multi-Language Support", tag: "Feature Request" },
        { id: "CAM-2", title: "Implement Email Notification System", tag: "Feature Request" },
        { id: "CAM-1", title: "Update User Profile Page UI", tag: "Feature Request" },
      ],
    },
    {
      title: "In-Progress",
      
      items: [
        { id: "CAM-3", title: "Optimize Database Queries for Performance", tag: "Feature Request" },
      ],
    },
    {
      title: "Done",
      items: [
        { id: "CAM-6", title: "Enhance Search Functionality", tag: "Feature Request" },
        { id: "CAM-7", title: "Integrate Third-Party Payment Gateway", tag: "Feature Request" },
        {
          id: "CAM-11",
          title: "Conduct Security Vulnerability Assesment",
          tag: "Feature Request",
        },
        {
          id: "CAM-10",
          title: "Upgrade Server Infrastructure",
          tag: "Feature Request",
        },
        {
          id: "CAM-9",
          title: "Implement Roie-Based Access Control(RBAC)",
          tag: "Feature Request",
          priority:"High",
        }
      ],
    },
    {
      title: "Canceled",
      items: [],
    },
  ];
  const handleAdd = (columnTitle) => {
    console.log(`Add task to ${columnTitle} column`);
    // Implement logic for adding a task
  };

  const handleMore = (columnTitle) => {
    console.log(`More actions for ${columnTitle} column`);
    // Implement logic for more options
  };

  // Filtering logic
  const filteredColumns = columns.map((column) => ({
    ...column,
    items: column.status.filter((item) => {
      if (statusFilter && item.status !== statusFilter) return false;
      if (priorityFilter && item.priority !== priorityFilter) return false; // Add this line
      if (userFilter && item.assignedUser !== userFilter) return false;
      return true;
    }),
  }));
  
  

  useEffect(() => {
     axios.get('https://api.quicksell.co/v1/internal/frontend-assignment') // Replace with your API endpoint
      .then((response) => {
        setData(response.data); 
        setUsers(response.data.users);
        setTickets(response.data.tickets)
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  console.log(data)

  return (
    <div className="kanban">
      {/* Display Dropdown */}
      <div className="display-wrapper">
        <button className="display-button" onClick={() => setDisplayOpen(!displayOpen)}>
          <FilterIcon />
          <span>Display</span>
          <ChevronIcon />
        </button>
        {displayOpen && (
          <div className="display-dropdown">
            <div className="dropdown-section">
              <div className="dropdown-header">Grouping</div>
              <div className="dropdown-item">
                <label>Status:</label>
                <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter || ""}>
                  <option value="">All</option>
                  <option value="Todo">Todo</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Done">Done</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <div className="dropdown-item">
  <label>Priority:</label>
  <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter || ""}>
    <option value="">All</option>
    <option value="Urgent">Urgent</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
    <option value="High">No Priority</option>
  </select>
</div>
              {/* Add more filters */}
            </div>
          </div>
        )}
      </div>

      {/* Kanban Board */}
      <div className="board">
        {filteredColumns.map((column) => (
          (!showEmptyLanes && column.items.length === 0) ? null : (
            <div key={column.title} className="column">
              <h2>{column.title} ({column.items.length})</h2>
              
              <div className="column-actions">
          {/* + Icon Button */}
          <button className="icon-button" title="Add" onClick={() => handleAdd(column.title)}>
            <PlusIcon />
          </button>
          {/* More Icon Button */}
          <button className="icon-button" title="More" onClick={() => handleMore(column.title)}>
            •••
          </button>
        </div>
              <div className="items">
                {column.items.map((item) => (
                  <div key={item.id} className="item">
                     <h5>{item.id}</h5>
                    <h3>{item.title}</h3>
                    <p>{item.tag}</p>
                    <p>{item.priority}</p>
                   
                  </div>
                  
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
