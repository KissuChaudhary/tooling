import React, { useEffect, useRef } from 'react';

interface AnimatedCoffeeCupProps {
  fillPercentage: number;
}

const AnimatedCoffeeCup: React.FC<AnimatedCoffeeCupProps> = ({ fillPercentage }) => {
  const cupRef = useRef<SVGPathElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (cupRef.current && liquidRef.current) {
      const cupLength = cupRef.current.getTotalLength();
      const liquidLength = liquidRef.current.getTotalLength();

      cupRef.current.style.strokeDasharray = `${cupLength} ${cupLength}`;
      cupRef.current.style.strokeDashoffset = `${cupLength}`;

      liquidRef.current.style.strokeDasharray = `${liquidLength} ${liquidLength}`;
      liquidRef.current.style.strokeDashoffset = `${liquidLength * (1 - fillPercentage / 100)}`;
    }
  }, [fillPercentage]);

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        ref={cupRef}
        d="M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={liquidRef}
        d="M6 1v3 M10 1v3 M14 1v3"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AnimatedCoffeeCup;

