import React, { FormEvent, useState } from 'react';
import './App.css';
import axios from 'axios';
import { AphorismForm } from './components/AphorismForm/AphorismForm';
import { AphorismFromEvent } from './components/AphorismForm/types';


function App() {
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target = event.target as any;
    const adjectives = target.adjectives.value;
    const topic = target.topic.value;

    // const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/aphorism`, {
    //   params: { adjectives, topic}
    // });

    const result = {data: {
      text: 'Reissu on aina reissu',
      url: '/test.png'
    }};
    setResponse(result.data.text);
    setImageUrl(result.data.url);
  }

  function loadCanvas() {
    console.log('loading');
    const canvas = document.getElementById('c') as HTMLCanvasElement;
    console.log('canvas', canvas);
    if (canvas) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      const image = new Image();
      image.onload = function() {
        console.log('onload started');
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(12, 256, 488, 248);
          
        const lines = splitText(response);
        ctx.fillStyle = 'black';
        ctx.font = '48px serif';
        lines.forEach((line, index) => {
          ctx.fillText(line, 18, 300 + (index * 40), 474);
        });
        console.log('onload done');

      };
      image.src = imageUrl;
    }
  }
  return (
    <div>
      <h1>AforismFi</h1>
      <AphorismForm onSubmit={onSubmit} />
      <p>Response: {response}</p>
      <p><button onClick={loadCanvas}>load</button></p>
      <canvas id='c' height='512' width='512'></canvas>
    </div>
  );
}

export default App;

function splitText(text: string): string[] {
  const lineLength = 50;

  const lines: string[] = [];
  
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start+lineLength, text.length);
    lines.push(text.substring(start, end));
    start += lineLength;
  }

  return lines;
}