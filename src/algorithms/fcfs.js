// // First-Come-First-Served (FCFS) algorithm
// export function fcfs(processes) {
//     // Create a deep copy of processes to avoid modifying original
//     const processQueue = JSON.parse(JSON.stringify(processes));
    
//     // Sort processes by arrival time
//     processQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
//     const ganttChart = [];
//     let currentTime = 0;
    
//     for (let i = 0; i < processQueue.length; i++) {
//       const process = processQueue[i];
      
//       // If the process hasn't arrived yet, update the current time
//       if (currentTime < process.arrivalTime) {
//         // Add idle time to Gantt chart
//         if (process.arrivalTime > currentTime) {
//           ganttChart.push({
//             pid: 'Idle',
//             startTime: currentTime,
//             endTime: process.arrivalTime,
//             color: '#cccccc'
//           });
//         }
//         currentTime = process.arrivalTime;
//       }
      
//       // Set start time for this process
//       if (process.startTime === -1) {
//         process.startTime = currentTime;
//       }
      
//       // Execute process
//       ganttChart.push({
//         pid: process.pid,
//         startTime: currentTime,
//         endTime: currentTime + process.burstTime,
//         color: process.color
//       });
      
//       // Update current time
//       currentTime += process.burstTime;
      
//       // Update process metrics
//       process.completionTime = currentTime;
//       process.turnaroundTime = process.completionTime - process.arrivalTime;
//       process.waitingTime = process.turnaroundTime - process.burstTime;
//     }
    
//     return { processes: processQueue, ganttChart };
//   }