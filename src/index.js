// src/index.js or src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// In App.js or index.js
import './App.css';



ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
