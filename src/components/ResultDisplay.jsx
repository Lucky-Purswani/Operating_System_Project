import React from 'react';
import GanttChart from './GanttChart';

function ResultsDisplay({ results }) {
  const { processes, ganttChart } = results;
  
  // Calculate summary metrics
  const calculateSummary = () => {
    if (!processes || processes.length === 0) {
      return { avgWaiting: 0, avgTurnaround: 0, cpuUtilization: 0 };
    }
    
    const totalWaiting = processes.reduce((sum, p) => sum + p.waitingTime, 0);
    const totalTurnaround = processes.reduce((sum, p) => sum + p.turnaroundTime, 0);
    
    const totalTime = ganttChart[ganttChart.length - 1].endTime;
    const idleTime = ganttChart
      .filter(segment => segment.id === 'Idle')
      .reduce((sum, segment) => sum + (segment.endTime - segment.startTime), 0);
    
    return {
      avgWaiting: (totalWaiting / processes.length).toFixed(2),
      avgTurnaround: (totalTurnaround / processes.length).toFixed(2),
      cpuUtilization: ((totalTime - idleTime) / totalTime * 100).toFixed(2)
    };
  };
  
  const summary = calculateSummary();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Results Summary</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs uppercase text-blue-600 font-semibold">Avg. Waiting Time</p>
          <p className="text-xl font-bold text-blue-800">{summary.avgWaiting}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-xs uppercase text-green-600 font-semibold">Avg. Turnaround Time</p>
          <p className="text-xl font-bold text-green-800">{summary.avgTurnaround}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-xs uppercase text-purple-600 font-semibold">CPU Utilization</p>
          <p className="text-xl font-bold text-purple-800">{summary.cpuUtilization}%</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Gantt Chart</h3>
        <GanttChart ganttChart={ganttChart} />
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Process Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Process</th>
                <th className="px-4 py-2 text-left">Arrival Time</th>
                <th className="px-4 py-2 text-left">Burst Time</th>
                <th className="px-4 py-2 text-left">Completion Time</th>
                <th className="px-4 py-2 text-left">Turnaround Time</th>
                <th className="px-4 py-2 text-left">Waiting Time</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {processes.map((process) => (
                <tr key={process.id} className="border-t">
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div 
                        className="h-4 w-4 rounded-full mr-2" 
                        style={{ backgroundColor: process.color }}
                      ></div>
                      <span className="font-medium">{process.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">{process.arrivalTime}</td>
                  <td className="px-4 py-2">{process.burstTime}</td>
                  <td className="px-4 py-2">{process.completionTime}</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {process.turnaroundTime}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {process.waitingTime}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;