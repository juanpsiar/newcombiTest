import React from 'react';

export default function Header() {
  return (
    <React.Fragment>
      <header className='absolute top-0 bg-gray-600 w-full flex justify-center p-2 items-center h-16 '>
        <label className='mx-9 w-1/2'> Home</label>
        <label className='mx-9 w-1/2'> Other page</label>
      </header>
    </React.Fragment>
  );
}
