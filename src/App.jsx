import React, { useState } from 'react';
import ProcessInput from './components/ProcessInput';
import ResultsDisplay from './components/ResultDisplay';
import { fcfs, sjf, srtf, roundRobin, priorityScheduling } from './algorithm';

function App() {
  // Initial processes state
  const [processes, setProcesses] = useState([
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1, color: getRandomColor() },
    { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 2, color: getRandomColor() },
    { id: 'P3', arrivalTime: 2, burstTime: 4, priority: 3, color: getRandomColor() }
  ]);
  
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [results, setResults] = useState(null);

  
  const addProcess = () => {
    const newId = `P${processes.length + 1}`; // Fixed issue with newId
    setProcesses([...processes, { 
      id: newId, 
      arrivalTime: 0,  
      burstTime: 5, 
      priority: 1,
      color: getRandomColor()
    }]);
  };

 
  const removeProcess = () => {
    if (processes.length > 1) {
      setProcesses(processes.slice(0, -1));
    }
  };


  const updateProcess = (index, field, value) => {
    const updatedProcesses = [...processes];
    updatedProcesses[index][field] = Number(value);
    setProcesses(updatedProcesses);
  };

  
  const runSimulation = () => {
    
    const processesToSimulate = processes.map(p => ({
      ...p,
      remainingTime: p.burstTime,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0
    }));

    let result;
    
    switch (algorithm) {
      case 'fcfs':
        result = fcfs(processesToSimulate);
        break;
      case 'sjf':
        result = sjf(processesToSimulate);
        break;
      case 'srtf':
        result = srtf(processesToSimulate);
        break;
      case 'rr':
        result = roundRobin(processesToSimulate, timeQuantum);
        break;
      case 'priority':
        result = priorityScheduling(processesToSimulate);
        break;
      default:
        result = fcfs(processesToSimulate);
    }

    setResults(result);
  };

    function getRandomColor() {
    const colors = [
      '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
      '#1abc9c', '#d35400', '#34495e', '#16a085', '#c0392b'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CPU Scheduling Simulator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProcessInput 
            processes={processes}
            algorithm={algorithm}
            timeQuantum={timeQuantum}
            updateProcess={updateProcess}
            setAlgorithm={setAlgorithm}
            setTimeQuantum={setTimeQuantum}
            addProcess={addProcess}
            removeProcess={removeProcess}
            runSimulation={runSimulation}
          />
          
          {results && <ResultsDisplay results={results} />}
        </div>
      </div>
    </div>
  );
}

export default App;
