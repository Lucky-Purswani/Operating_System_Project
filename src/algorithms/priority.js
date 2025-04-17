// // Priority Scheduling (Non-preemptive)
// export function priorityScheduling(processes) {
//     // Create a deep copy of processes to avoid modifying original
//     const processQueue = JSON.parse(JSON.stringify(processes));
    
//     // Sort processes by arrival time first to handle initial state
//     processQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
//     const ganttChart = [];
//     let currentTime = 0;
//     let completed = 0;
//     const n = processQueue.length;
//     const isCompleted = new Array(n).fill(false);
    
//     // Loop until all processes are completed
//     while (completed < n) {
//       let highestPriorityIndex = -1;
//       let highestPriority = Number.MAX_VALUE; // Lower value = higher priority
      
//       // Find the process with the highest priority that has arrived but not completed
//       for (let i = 0; i < n; i++) {
//         if (!isCompleted[i] && processQueue[i].arrivalTime <= currentTime && processQueue[i].priority < highestPriority) {
//           highestPriority = processQueue[i].priority;
//           highestPriorityIndex = i;
//         }
//       }
      
//       // If no process is available to execute at current time
//       if (highestPriorityIndex === -1) {
//         // Find the next process to arrive
//         let nextArrival = Number.MAX_VALUE;
//         for (let i = 0; i < n; i++) {
//           if (!isCompleted[i] && processQueue[i].arrivalTime < nextArrival) {
//             nextArrival = processQueue[i].arrivalTime;
//           }
//         }
        
//         // Add idle time to Gantt chart
//         ganttChart.push({
//           pid: 'Idle',
//           startTime: currentTime,
//           endTime: nextArrival,
//           color: '#cccccc'
//         });
        
//         currentTime = nextArrival;
//       } else {
//         const process = processQueue[highestPriorityIndex];
        
//         // Set start time for this process
//         if (process.startTime === -1) {
//           process.startTime = currentTime;
//         }
        
//         // Execute process
//         ganttChart.push({
//           pid: process.pid,
//           startTime: currentTime,
//           endTime: currentTime + process.burstTime,
//           color: process.color
//         });
        
//         // Update current time
//         currentTime += process.burstTime;
        
//         // Update process metrics
//         process.completionTime = currentTime;
//         process.turnaroundTime = process.completionTime - process.arrivalTime;
//         process.waitingTime = process.turnaroundTime - process.burstTime;
        
//         // Mark process as completed
//         isCompleted[highestPriorityIndex] = true;
//         completed++;
//       }
//     }
    
//     return { processes: processQueue, ganttChart };
//   }