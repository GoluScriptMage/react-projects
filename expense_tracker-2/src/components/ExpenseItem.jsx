import React from 'react'

const ExpenseItem = ({ expense, onDelete }) => {
    const { name, amount, date } = expense
    return (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow transition-colors duration-300">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-lg px-3 py-2 min-w-[80px]">
                    <span className="text-xs font-medium">{new Date(date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold">{new Date(date).getDate()}</span>
                    <span className="text-xs">{new Date(date).getFullYear()}</span>
                </div>
                <div>
                    <div className="text-base font-semibold text-gray-800 dark:text-gray-100">{name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">${amount}</div>
                </div>
            </div>
            <button onClick={onDelete} className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600">
                Delete
            </button>
        </div>
    )
}

export default ExpenseItem