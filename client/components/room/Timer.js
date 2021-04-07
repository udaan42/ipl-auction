import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp, countdownExpired, sold}) {
  
  const timeExpired = () => {
    countdownExpired();
  }
  
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: timeExpired });

  useEffect(() => {
      if(sold){
        pause();
      }else{
        restart(expiryTimestamp)
      }
  }, [expiryTimestamp, sold])


  return (
    <div style={{textAlign: 'center', marginTop: 14, marginRight: 10}}>
      <div style={{fontSize: '30px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}