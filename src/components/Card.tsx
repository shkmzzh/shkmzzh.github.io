import { ReactNode } from 'react';
export default function Card({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className="Card-warp">
        <div className="Card-caption">
            <div className='Card-bg'>
            {children}
            </div>
            
            </div>
      </div>
    </>
  );
}
