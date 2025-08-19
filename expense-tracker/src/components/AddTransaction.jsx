import React, { useState } from "react";

const AddTransaction = ({ updateTransactions }) => {
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
    type: "",
  });

  const updateTransaction = (e) => {
    const { name } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransactions(transaction);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-gray-800 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-gray-900 transition font-semibold w-full md:w-auto"
      >
        Add New Transaction
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-2xl transition-opacity duration-300">
          {/* Make the modal card scrollable on small screens */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-xs sm:max-w-sm mx-2
      max-h-[90vh] overflow-y-auto
      transform transition-all duration-300 scale-100 opacity-100 animate-modal-in">
            <h3 className="text-xl font-bold text-white mb-6 text-center font-sans">
              Add New Transaction
            </h3>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-200 mb-1 font-sans">
                  Transaction Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-sans"
                  placeholder="e.g. Salary"
                  onChange={updateTransaction}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-1 font-sans">Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-sans"
                  placeholder="e.g. 100"
                  onChange={updateTransaction}
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-1 font-sans">Type</label>
                <select
                  name="type"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-sans"
                  defaultValue=""
                  onChange={updateTransaction}
                  required
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition font-sans w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gray-900 text-yellow-400 font-bold shadow hover:bg-gray-800 transition font-sans w-full sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransaction;
