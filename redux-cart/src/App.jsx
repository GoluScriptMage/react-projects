import React from 'react'
import Header from './components/Header';
import Menu from './components/Menu';
import CartOpened from './components/CartOpened';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white w-full flex flex-col items-center">
      <Header />
      <Menu /> 
      <CartOpened />
    </div>
  )
}

export default App