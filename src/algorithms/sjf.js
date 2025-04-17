// export function sjf(processes) {
//     // Create a deep copy of processes to avoid modifying original
//     const processQueue = JSON.parse(JSON.stringify(processes));
    
//     // Sort processes by arrival time first to handle initial state
//     processQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
//     const ganttChart = [];
//     let currentTime = 0;
//     let completed = 0;
//     const n = processQueue.length;
//     const isCompleted = new Array(n).fill(false);
    
//     const readyQueue = [];
//     let completed = 0;
//     let index = 0;
    
//     // Add first arriving process(es) to ready queue
//     while (index < n && processQueue[index].arrivalTime <= currentTime) {
//       readyQueue.push(index);
//       index++;
//     }
    
//     while (completed < n) {
//       if (readyQueue.length === 0) {
//         // No process in ready queue, find next arrival
//         if (index < n) {
//           // Add idle time to Gantt chart
//           ganttChart.push({
//             pid: 'Idle',
//             startTime: currentTime,
//             endTime: processQueue[index].arrivalTime,
//             color: '#cccccc'
//           });
          
//           currentTime = processQueue[index].arrivalTime;
          
//           // Add newly arrived processes to ready queue
//           while (index < n && processQueue[index].arrivalTime <= currentTime) {
//             readyQueue.push(index);
//             index++;
//           }
//         } else {
//           // All processes have arrived but not all completed (should not happen in a valid schedule)
//           break;
//         }
//       } else {
//         // Get process from ready queue
//         const currentProcessIndex = readyQueue.shift();
//         const currentProcess = processQueue[currentProcessIndex];
        
//         // If this is the first time this process is running, record its start time
//         if (currentProcess.startTime === -1) {
//           currentProcess.startTime = currentTime;
//         }
        
//         // Determine how long this process will run
//         const executeTime = Math.min(quantum, remainingBurst[currentProcessIndex]);
        
//         // Execute process
//         ganttChart.push({
//           pid: currentProcess.pid,
//           startTime: currentTime,
//           endTime: currentTime + executeTime,
//           color: currentProcess.color
//         });
        
//         // Update current time
//         currentTime += executeTime;
        
//         // Add any newly arrived processes to ready queue
//         while (index < n && processQueue[index].arrivalTime <= currentTime) {
//           readyQueue.push(index);
//           index++;
//         }
        
//         // Update remaining burst time
//         remainingBurst[currentProcessIndex] -= executeTime;
        
//         // Check if process is completed
//         if (remainingBurst[currentProcessIndex] === 0) {
//           // Update process metrics
//           currentProcess.completionTime = currentTime;
//           currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
//           currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
          
//           isCompleted[currentProcessIndex] = true;
//           completed++;
//         } else {
//           // Put process back in ready queue
//           readyQueue.push(currentProcessIndex);
//         }
//       }
//       return { processes: processQueue, ganttChart };n).fill(false);
//     }
// }