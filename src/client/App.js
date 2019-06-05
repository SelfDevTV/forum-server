import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [test] = useState('hello');

  useEffect(() => {
    axios.get('/api/posts/myposts').then(data => console.log(data));
  });
  return <a href="/api/auth/facebook">Login</a>;
};

export default App;
