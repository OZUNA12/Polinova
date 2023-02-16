import React from 'react';
import { Navigate } from 'react-router-dom';

export default function LoggedRoute({ children }) {
  const id = localStorage.getItem('id');
  return id ? children : <Navigate to="/login" />;
}