import React from 'react';

function ProcessInput({ 
  processes, 
  algorithm, 
  timeQuantum, 
  updateProcess, 
  setAlgorithm, 
  setTimeQuantum,
  addProcess,
  removeProcess,
  runSimulation
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-[700px] flex flex-col overflow-hidden border border-gray-200">
      <h2 className="text-xl font-bold mb-5 text-gray-800 pb-3 border-b border-gray-100">Process Input</h2>
      
      {/* Algorithm Selection */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">Scheduling Algorithm</label>
        <div className="relative">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full p-2.5 border rounded-md bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8"
          >
            <option value="fcfs">First-Come-First-Served (FCFS)</option>
            <option value="sjf">Shortest Job First (SJF)</option>
            <option value="srtf">Shortest Remaining Time First (SRTF)</option>
            <option value="rr">Round Robin (RR)</option>
            <option value="priority">Priority Scheduling</option>
          </select>
        </div>
      </div>
      
      {/* Time Quantum for Round Robin */}
      {algorithm === 'rr' && (
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2 text-gray-700">Time Quantum</label>
          <input 
            type="number"
            min="1"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(parseInt(e.target.value) || 1)}
            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
      
      {/* Process Table */}
      <div className="flex-1 overflow-auto mb-5 bg-gray-50 rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Process ID</th>
              <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Arrival Time</th>
              <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Burst Time</th>
              {algorithm === 'priority' && (
                <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Priority</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {processes.map((process, index) => (
              <tr key={process.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 whitespace-nowrap">
                  <div 
                    className="flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${process.color}20`, color: process.color }}
                  >
                    {process.id}
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <input 
                    type="number"
                    min="0"
                    value={process.arrivalTime}
                    onChange={(e) => updateProcess(index, 'arrivalTime', e.target.value)}
                    className="w-16 p-1.5 text-center border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="p-3 whitespace-nowrap">
                  <input 
                    type="number"
                    min="1"
                    value={process.burstTime}
                    onChange={(e) => updateProcess(index, 'burstTime', e.target.value)}
                    className="w-16 p-1.5 text-center border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {algorithm === 'priority' && (
                  <td className="p-3 whitespace-nowrap">
                    <input 
                      type="number"
                      min="1"
                      value={process.priority}
                      onChange={(e) => updateProcess(index, 'priority', e.target.value)}
                      className="w-16 p-1.5 text-center border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Process Controls */}
      <div className="flex space-x-2 mb-5">
        <button 
          onClick={addProcess}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-md transition-all duration-200 shadow-sm"
        >
          Add Process
        </button>
        <button 
          onClick={removeProcess}
          className={`flex-1 ${processes.length <= 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'} text-white px-4 py-2 rounded-md transition-all duration-200 shadow-sm`}
          disabled={processes.length <= 1}
        >
          Remove Process
        </button>
      </div>
      
      {/* Simulate Button */}
      <button 
        onClick={runSimulation}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-md font-medium transition-all duration-200 shadow-md"
      >
        Simulate
      </button>
    </div>
  );
}

export default ProcessInput;
