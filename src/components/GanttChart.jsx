import React from 'react';

function GanttChart({ ganttChart }) {
  if (!ganttChart || ganttChart.length === 0) {
    return <div className="text-gray-500">No data to display</div>;
  }

  const totalTime = ganttChart[ganttChart.length - 1].endTime;

  const maxWidthPx = 850;
  const pixelsPerTimeUnit = Math.min(maxWidthPx / totalTime, 50);

  const markerInterval = totalTime > 20 ? 
                        (totalTime > 50 ? 5 : 2) : 1;
  
  const timeMarkers = [];
  for (let i = 0; i <= totalTime; i += markerInterval) {
    timeMarkers.push(i);
  }
  if (timeMarkers[timeMarkers.length - 1] !== totalTime) {
    timeMarkers.push(totalTime);
  }
  
  return (
    <div>
      <div className="overflow-x-auto mb-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
        <div 
          className="relative" 
          style={{ 
            height: '80px', 
            width: `${totalTime * pixelsPerTimeUnit + 20}px`,
            minWidth: '100%'
          }}
        >
          {ganttChart.map((segment, index) => {
            const width = (segment.endTime - segment.startTime) * pixelsPerTimeUnit;
            const left = segment.startTime * pixelsPerTimeUnit;
            
            return (
              <div 
                key={index}
                className="absolute flex items-center justify-center text-white font-medium rounded-sm shadow-sm"
                style={{
                  left: `${left}px`,
                  width: `${Math.max(width, 4)}px`,
                  height: '40px',
                  backgroundColor: segment.id === 'Idle' ? '#d1d5db' : segment.color,
                  top: '0',
                  fontSize: width < 30 ? '10px' : '14px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                title={`${segment.id}: ${segment.startTime} - ${segment.endTime}`}
              >
                {width > 25 ? segment.id : ''}
              </div>
            );
          })}
          
          {timeMarkers.map(i => (
            <div 
              key={`marker-${i}`}
              className="absolute flex flex-col items-center"
              style={{ left: `${i * pixelsPerTimeUnit}px`, top: '40px' }}
            >
              <div className="w-px h-3 bg-gray-300"></div>
              <div className="text-xs text-gray-600 mt-1">{i}</div>
            </div>
          ))}
          
          <div 
            className="absolute h-px bg-gray-300 left-0 right-0"
            style={{ top: '40px' }}
          ></div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {[...new Set(ganttChart.map(seg => seg.id))].map(id => {
          const segmentColor = ganttChart.find(seg => seg.id === id)?.color || '#cccccc';
          return id !== 'Idle' ? (
            <div key={id} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-sm mr-1"
                style={{ backgroundColor: segmentColor }}
              ></div>
              <span className="text-xs">{id}</span>
            </div>
          ) : null;
        })}
      </div>

      {totalTime > 30 && (
        <div className="text-xs text-gray-500 italic mb-2">
          * You can scroll horizontally to view the entire chart
        </div>
      )}
    </div>
  );
}

export default GanttChart;
