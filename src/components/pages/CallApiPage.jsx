import axios from 'axios';
import React, { useEffect } from 'react';

export default function CallApiPage({ apiData }) {
  useEffect(() => {
    console.log(apiData);
    axios('https://http.cat/200')
      .then((res) => console.log(res.data));
  }, []);
  return (
    <div>CallApiPage</div>
  );
}
