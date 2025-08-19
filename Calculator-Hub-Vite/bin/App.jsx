import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Layout components
import Layout from './components/layout/Layout'

// Calculator components
import LoveCalculator from './components/calculators/LoveCalculator'
import EnhancedCalculator from './components/calculators/EnhancedCalculator'

// Home page component
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="calculators">
          <Route index element={<Navigate to="/" replace />} />
          <Route path="love" element={<LoveCalculator />} />
          <Route path="friendship" element={<EnhancedCalculator calculatorType="friendship" />} />
          <Route path="career" element={<EnhancedCalculator calculatorType="career" />} />
          <Route path="personality" element={<EnhancedCalculator calculatorType="personality" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
