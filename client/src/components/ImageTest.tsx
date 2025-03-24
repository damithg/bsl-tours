import React from 'react';

export default function ImageTest() {
  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Image Test Component</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Local SVG Test</h3>
          <img 
            src="/images/test-image.svg" 
            alt="Local Test SVG" 
            className="border border-gray-300 rounded"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">External Image Test</h3>
          <img 
            src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Unsplash Sri Lanka" 
            className="border border-gray-300 rounded max-w-md"
          />
        </div>
      </div>
    </div>
  );
}