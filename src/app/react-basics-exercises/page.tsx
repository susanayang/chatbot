'use client';

import { useState, useRef } from 'react';

export default function ReactBasicsExercisesPage() {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLButtonElement>(null);

  function autoClick() {
    setInterval(() => {
      const buttonElem = countRef.current;
      if (buttonElem) {
        buttonElem.click();
      }
    }, 1000);
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'rgb(222, 222, 222)',
      alignItems: 'center'
    }}>
      <button
        onClick={() => setCount(count + 1)}
        ref={countRef}
        style={{
          backgroundColor: 'rgb(25, 135, 84)',
          color: 'white',
          padding: '10px 12px',
          border: 'none',
          margin: '5px',
          cursor: 'pointer'
        }}
      >
        Clicked {count} times
      </button>
      <button
        onClick={() => setCount(0)}
        style={{
          backgroundColor: 'rgb(25, 135, 84)',
          color: 'white',
          padding: '10px 12px',
          border: 'none',
          margin: '5px',
          cursor: 'pointer'
        }}
      >
        Reset
      </button>
      <button
        onClick={autoClick}
        style={{
          backgroundColor: 'rgb(25, 135, 84)',
          color: 'white',
          padding: '10px 12px',
          border: 'none',
          margin: '5px',
          cursor: 'pointer'
        }}
      >
        Auto Click
      </button>
    </div>
  );
}