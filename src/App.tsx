import React, { useState } from 'react';
import Body from './components/Body';
import Header from './components/Header';

const App = () => {
  const [title,setTitle]=useState(1);
  return (
    <div>
      <Header title={title} setTitle={setTitle}/>
      <Body title={title}/>
    </div>
  );
}

export default App;
