import React from 'react'

const Bar = ({ month, amount, max }) => {
  const fillPercent = max ? (amount / max) * 100 : 0

  return (
    <div className="flex flex-col items-center w-6">
      <div className="relative flex items-end h-36 w-full mb-1">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex flex-col justify-end">
          <div
            className="bg-blue-500 dark:bg-blue-400 w-full rounded-b-lg transition-all duration-500"
            style={{ height: `${fillPercent}%` }}
          ></div>
        </div>
      </div>
      <span className="text-xs text-gray-600 dark:text-gray-300">{month}</span>
    </div>
  )
}

export default Bar