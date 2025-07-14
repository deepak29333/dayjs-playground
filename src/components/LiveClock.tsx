import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Clock } from 'lucide-react';

const LiveClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-4 sm:p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h3 className="text-base sm:text-lg font-semibold">Live Clock</h3>
      </div>
      
      <div className="space-y-2">
        <div className="text-xl sm:text-2xl font-mono font-bold">
          {currentTime.format('HH:mm:ss')}
        </div>
        <div className="text-sm sm:text-base text-blue-200">
          {currentTime.format('MMMM D, YYYY')}
        </div>
        <div className="text-blue-200 text-xs sm:text-sm">
          {currentTime.format('dddd')}
        </div>
      </div>
    </div>
  );
};

export default LiveClock;