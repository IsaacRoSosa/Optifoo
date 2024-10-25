"use client";

import { useEffect, useState } from 'react';

export default function ClientAuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const userUid = localStorage.getItem('user_uid');
    if (userUid) {
      setIsAuthenticated(true); 
    } else {
      window.location.href = '/login';  
    }
  }, []); 

  if (!isAuthenticated) {
    return null;  
  }

  return (
    <>
      {children}
    </>
  );
}
