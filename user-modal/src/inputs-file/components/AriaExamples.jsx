import React from "react";

const AriaExamples = () => {
  return (
    <div className="p-4 space-y-6 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Example for aria-checked */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-checked</h3>
        <div
          role="checkbox"
          aria-checked="true"
          className="w-5 h-5 bg-blue-600 border border-blue-600 rounded"
        ></div>
        <p className="mt-2">Indicates checkbox or radio button state.</p>
      </div>

      {/* Example for aria-disabled */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-disabled</h3>
        <button
          aria-disabled="true"
          className="px-4 py-2 bg-gray-700 text-gray-400 rounded cursor-not-allowed"
        >
          Submit
        </button>
        <p className="mt-2">Indicates an element is perceivable but disabled.</p>
      </div>

      {/* Example for aria-expanded */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-expanded</h3>
        <button
          aria-expanded="false"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Show more
        </button>
        <p className="mt-2">Indicates if a control is expanded or collapsed.</p>
      </div>

      {/* Example for aria-hidden */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-hidden</h3>
        <div aria-hidden="true" className="text-gray-400">
          Decorative content
        </div>
        <p className="mt-2">Hides elements from assistive tech.</p>
      </div>

      {/* Example for aria-selected */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-selected</h3>
        <div
          role="option"
          aria-selected="true"
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Option 1
        </div>
        <p className="mt-2">Indicates selection state (tabs, options).</p>
      </div>

      {/* Example for aria-pressed */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-pressed</h3>
        <button
          aria-pressed="true"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Like
        </button>
        <p className="mt-2">Indicates the pressed state of a toggle button.</p>
      </div>

      {/* Example for aria-controls */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-controls</h3>
        <button
          aria-controls="menu1"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Open Menu
        </button>
        <p className="mt-2">Indicates an element controls another element.</p>
      </div>

      {/* Example for aria-owns */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-owns</h3>
        <ul aria-owns="extraItem" className="list-disc pl-5">
          <li>Item 1</li>
          <li id="extraItem">Extra Item</li>
        </ul>
        <p className="mt-2">Indicates element ownership when DOM structure doesn't.</p>
      </div>

      {/* Example for aria-activedescendant */}
      <div className="border border-gray-700 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">aria-activedescendant</h3>
        <ul aria-activedescendant="item2" className="list-disc pl-5">
          <li id="item1">Item 1</li>
          <li id="item2" className="text-blue-600">Item 2 (Active)</li>
        </ul>
        <p className="mt-2">Identifies the currently active element.</p>
      </div>
    </div>
  );
};

export default AriaExamples;
