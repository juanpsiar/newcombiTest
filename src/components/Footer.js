import React from 'react';

export default function Footer() {
  return (
    <React.Fragment>
      <footer className='absolute bottom-0 bg-gray-600 w-full flex justify-between p-2 items-center h-16'>
        <label className='mx-9'> Copyright</label>
        <label className='mx-9'> All rights reserved</label>
      </footer>
    </React.Fragment>
  );
}
