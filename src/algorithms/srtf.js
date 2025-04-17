// export function srtf(processes) {
//     // Create a deep copy of processes to avoid modifying original
//     const processQueue = JSON.parse(JSON.stringify(processes));
//     const n = processQueue.length;
    
//     // Sort processes by arrival time
//     processQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
//     const ganttChart = [];
//     let currentTime = 0;
//     let completed = 0;
//     const remainingBurst = processQueue.map(p => p.burstTime);
//     const isCompleted = new Array(n).fill(false);
    
//     let prevProcess = -1; // To track process switches for Gantt chart
//     let ganttStart = 0;   // Start time for current Gantt chart entry
    
//     // Continue until all processes are completed
//     while (completed < n) {
//       let shortestRemainingIndex = -1;
//       let shortestRemaining = Number.MAX_VALUE;
      
//       // Find the process with shortest remaining time
//       for (let i = 0; i < n; i++) {
//         if (!isCompleted[i] && processQueue[i].arrivalTime <= currentTime && remainingBurst[i] < shortestRemaining && remainingBurst[i] > 0) {
//           shortestRemaining = remainingBurst[i];
//           shortestRemainingIndex = i;
//         }
//       }
      
//       // If no process is available to execute at current time
//       if (shortestRemainingIndex === -1) {
//         // If the previous process was also idle, just extend the idle time
//         if (prevProcess === -1) {
//           currentTime++;
//           continue;
//         }
        
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
//           startTime: ganttStart,
//           endTime: nextArrival,
//           color: '#cccccc'
//         });
        
//         currentTime = nextArrival;
//         ganttStart = nextArrival;
//         prevProcess = -1;
//       } else {
//         // If this is the first time this process is running, record its start time
//         if (processQueue[shortestRemainingIndex].startTime === -1) {
//           processQueue[shortestRemainingIndex].startTime = currentTime;
//         }
        
//         // Process switch for Gantt chart
//         if (prevProcess !== shortestRemainingIndex) {
//           if (prevProcess !== -1) {
//             // Add previous process to Gantt chart
//             ganttChart.push({
//               pid: processQueue[prevProcess].pid,
//               startTime: ganttStart,
//               endTime: currentTime,
//               color: processQueue[prevProcess].color
//             });
//           }
//           ganttStart = currentTime;
//           prevProcess = shortestRemainingIndex;
//         }
        
//         // Execute one unit of time
//         remainingBurst[shortestRemainingIndex]--;
//         currentTime++;
        
//         // Check if process is completed
//         if (remainingBurst[shortestRemainingIndex] === 0) {
//           ganttChart.push({
//             pid: processQueue[shortestRemainingIndex].pid,
//             startTime: ganttStart,
//             endTime: currentTime,
//             color: processQueue[shortestRemainingIndex].color
//           });
          
//           // Update process metrics
//           processQueue[shortestRemainingIndex].completionTime = currentTime;
//           processQueue[shortestRemainingIndex].turnaroundTime = processQueue[shortestRemainingIndex].completionTime - processQueue[shortestRemainingIndex].arrivalTime;
//           processQueue[shortestRemainingIndex].waitingTime = processQueue[shortestRemainingIndex].turnaroundTime - processQueue[shortestRemainingIndex].burstTime;
          
//           isCompleted[shortestRemainingIndex] = true;
//           completed++;
//           ganttStart = currentTime;
//           prevProcess = -1;
//         }
//       }
//     }
    
//     return { processes: processQueue, ganttChart };
//   }