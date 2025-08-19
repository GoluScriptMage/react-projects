import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EnhancedCalculator } from '../components/calculators';
import { FEATURES } from '../config';
import { analytics } from '../services';

const CalculatorPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [useEnhanced, setUseEnhanced] = useState(FEATURES.ENHANCED_CALCULATOR);
  
  // Get user name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      // If no name is stored, redirect to home page
      navigate('/');
    }
  }, [navigate]);
  
  // Validate calculator type
  useEffect(() => {
    const validTypes = ['love', 'friendship', 'career', 'personality'];
    if (!validTypes.includes(type)) {
      navigate('/404');
    }
  }, [type, navigate]);
  
  // Track calculator start
  useEffect(() => {
    if (userName && type) {
      analytics.trackCalculatorStart(type, useEnhanced);
    }
  }, [userName, type, useEnhanced]);
  
  // Handle going back to home
  const handleBack = () => {
    navigate('/');
  };
  
  // Show loading state while getting user name
  if (!userName) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <EnhancedCalculator
        calculatorType={type}
        userName={userName}
        onBack={handleBack}
      />
    </div>
  );
};

export default CalculatorPage;
