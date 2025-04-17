
export function fcfs(processes) {
    const processQueue = [...processes];
    

    processQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    const ganttChart = [];
    let currentTime = 0;
    
    for (let i = 0; i < processQueue.length; i++) {
      const process = processQueue[i];
      

      if (currentTime < process.arrivalTime) {
        
        if (process.arrivalTime > currentTime) {
          ganttChart.push({
            id: 'Idle',
            startTime: currentTime,
            endTime: process.arrivalTime,
            color: '#cccccc'
          });
        }
        currentTime = process.arrivalTime;
      }
      
      
      ganttChart.push({
        id: process.id,
        startTime: currentTime,
        endTime: currentTime + process.burstTime,
        color: process.color
      });
      

      currentTime += process.burstTime;
      

      process.completionTime = currentTime;
      process.turnaroundTime = process.completionTime - process.arrivalTime;
      process.waitingTime = process.turnaroundTime - process.burstTime;
    }
    
    return { processes: processQueue, ganttChart };
  }
  

  export function sjf(processes) {
    const processQueue = [...processes];
    const n = processQueue.length;
    const ganttChart = [];
    let currentTime = 0;
    let completed = 0;
    const isCompleted = new Array(n).fill(false);
    
    while (completed < n) {
      let shortestJobIndex = -1;
      let shortestBurst = Number.MAX_VALUE;
      

      for (let i = 0; i < n; i++) {
        if (!isCompleted[i] && processQueue[i].arrivalTime <= currentTime && processQueue[i].burstTime < shortestBurst) {
          shortestBurst = processQueue[i].burstTime;
          shortestJobIndex = i;
        }
      }
      

      if (shortestJobIndex === -1) {
        let nextArrival = Number.MAX_VALUE;
        let nextIndex = 0;
        
        for (let i = 0; i < n; i++) {
          if (!isCompleted[i] && processQueue[i].arrivalTime < nextArrival) {
            nextArrival = processQueue[i].arrivalTime;
            nextIndex = i;
          }
        }
        

        ganttChart.push({
          id: 'Idle',
          startTime: currentTime,
          endTime: nextArrival,
          color: '#cccccc'
        });
        
        currentTime = nextArrival;
      } else {

        const process = processQueue[shortestJobIndex];
        
        ganttChart.push({
          id: process.id,
          startTime: currentTime,
          endTime: currentTime + process.burstTime,
          color: process.color
        });
        
        currentTime += process.burstTime;
        
        
        process.completionTime = currentTime;
        process.turnaroundTime = process.completionTime - process.arrivalTime;
        process.waitingTime = process.turnaroundTime - process.burstTime;
        
        isCompleted[shortestJobIndex] = true;
        completed++;
      }
    }
    
    return { processes: processQueue, ganttChart };
  }
  
  
  export function srtf(processes) {
    const processQueue = [...processes];
    const n = processQueue.length;
    const ganttChart = [];
    const remainingTime = processQueue.map(p => p.burstTime);
    
    let currentTime = 0;
    let completed = 0;
    let prevProcess = -1;
    let ganttStart = 0;
    
    while (completed < n) {
      let shortest = -1;
      let minRemaining = Number.MAX_VALUE;
      
      
      for (let i = 0; i < n; i++) {
        if (processQueue[i].completionTime === 0 && 
            processQueue[i].arrivalTime <= currentTime && 
            remainingTime[i] < minRemaining && 
            remainingTime[i] > 0) {
          minRemaining = remainingTime[i];
          shortest = i;
        }
      }
      
      // If no process found
      if (shortest === -1) {
        // Find next arrival
        let nextArrival = Number.MAX_VALUE;
        for (let i = 0; i < n; i++) {
          if (processQueue[i].completionTime === 0 && 
              processQueue[i].arrivalTime < nextArrival) {
            nextArrival = processQueue[i].arrivalTime;
          }
        }
        
        
        if (prevProcess !== -1) {
          ganttChart.push({
            id: processQueue[prevProcess].id,
            startTime: ganttStart,
            endTime: currentTime,
            color: processQueue[prevProcess].color
          });
        }
        
        ganttChart.push({
          id: 'Idle',
          startTime: currentTime,
          endTime: nextArrival,
          color: '#cccccc'
        });
        
        currentTime = nextArrival;
        ganttStart = currentTime;
        prevProcess = -1;
      } else {
        // If process changed
        if (prevProcess !== shortest) {
          if (prevProcess !== -1) {
            ganttChart.push({
              id: processQueue[prevProcess].id,
              startTime: ganttStart,
              endTime: currentTime,
              color: processQueue[prevProcess].color
            });
          }
          ganttStart = currentTime;
          prevProcess = shortest;
        }
        
        
        remainingTime[shortest]--;
        currentTime++;
        
       
        if (remainingTime[shortest] === 0) {
          completed++;
          
          
          ganttChart.push({
            id: processQueue[shortest].id,
            startTime: ganttStart,
            endTime: currentTime,
            color: processQueue[shortest].color
          });
          
          
          processQueue[shortest].completionTime = currentTime;
          processQueue[shortest].turnaroundTime = currentTime - processQueue[shortest].arrivalTime;
          processQueue[shortest].waitingTime = processQueue[shortest].turnaroundTime - processQueue[shortest].burstTime;
          
          prevProcess = -1;
          ganttStart = currentTime;
        }
      }
    }
    
    return { processes: processQueue, ganttChart };
  }
  
  // Round Robin (RR)
  export function roundRobin(processes, quantum) {
    const processQueue = [...processes];
    const n = processQueue.length;
    const ganttChart = [];
    
    
    const remainingTime = processQueue.map(p => p.burstTime);
    
    
    const readyQueue = [];
    let completed = 0;
    let currentTime = 0;
    let index = 0;
    
    
    while (index < n && processQueue[index].arrivalTime <= currentTime) {
      readyQueue.push(index);
      index++;
    }
    
    while (completed < n) {
      if (readyQueue.length === 0) {
        
        if (index < n) {
          ganttChart.push({
            id: 'Idle',
            startTime: currentTime,
            endTime: processQueue[index].arrivalTime,
            color: '#cccccc'
          });
          
          currentTime = processQueue[index].arrivalTime;
          
          while (index < n && processQueue[index].arrivalTime <= currentTime) {
            readyQueue.push(index);
            index++;
          }
        }
      } else {
        
        const i = readyQueue.shift();
        
        
        const executeTime = Math.min(quantum, remainingTime[i]);
        
        
        ganttChart.push({
          id: processQueue[i].id,
          startTime: currentTime,
          endTime: currentTime + executeTime,
          color: processQueue[i].color
        });
        
        
        currentTime += executeTime;
        
        // Check for new arrivals
        while (index < n && processQueue[index].arrivalTime <= currentTime) {
          readyQueue.push(index);
          index++;
        }
        
        
        remainingTime[i] -= executeTime;
        

        if (remainingTime[i] === 0) {
          completed++;
          
          // Update process metrics
          processQueue[i].completionTime = currentTime;
          processQueue[i].turnaroundTime = currentTime - processQueue[i].arrivalTime;
          processQueue[i].waitingTime = processQueue[i].turnaroundTime - processQueue[i].burstTime;
        } else {
          // Put back in ready queue
          readyQueue.push(i);
        }
      }
    }
    
    return { processes: processQueue, ganttChart };
  }
  
  // Priority Scheduling (Non-preemptive)
  export function priorityScheduling(processes) {
    const processQueue = [...processes];
    const n = processQueue.length;
    const ganttChart = [];
    let currentTime = 0;
    let completed = 0;
    const isCompleted = new Array(n).fill(false);
    
    while (completed < n) {
      let highestPriorityIndex = -1;
      let highestPriority = Number.MAX_VALUE; // Lower number = higher priority
      
      
      for (let i = 0; i < n; i++) {
        if (!isCompleted[i] && processQueue[i].arrivalTime <= currentTime && processQueue[i].priority < highestPriority) {
          highestPriority = processQueue[i].priority;
          highestPriorityIndex = i;
        }
      }
      
      
      if (highestPriorityIndex === -1) {
        // Find next arrival
        let nextArrival = Number.MAX_VALUE;
        for (let i = 0; i < n; i++) {
          if (!isCompleted[i] && processQueue[i].arrivalTime < nextArrival) {
            nextArrival = processQueue[i].arrivalTime;
          }
        }
        
        
        ganttChart.push({
          id: 'Idle',
          startTime: currentTime,
          endTime: nextArrival,
          color: '#cccccc'
        });
        
        currentTime = nextArrival;
      } else {
        
        const process = processQueue[highestPriorityIndex];
        
        ganttChart.push({
          id: process.id,
          startTime: currentTime,
          endTime: currentTime + process.burstTime,
          color: process.color
        });
        
        currentTime += process.burstTime;
        
        
        process.completionTime = currentTime;
        process.turnaroundTime = process.completionTime - process.arrivalTime;
        process.waitingTime = process.turnaroundTime - process.burstTime;
        
        isCompleted[highestPriorityIndex] = true;
        completed++;
      }
    }
    
    return { processes: processQueue, ganttChart };
  }