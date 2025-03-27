import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { ReactElement } from 'react';


import Card from '@/components/Card'

const styleObject = {
  color: 'red',
};

export default function Home() {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'm') {
        setIsHighlighted(true);
        setClickCount((prevCount) => prevCount + 1);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'm') {
        setIsHighlighted(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      <Card>
      <div
        style={styleObject}
      >
        <span>hello world</span>
      
      </div>
    
      </Card>
     
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
