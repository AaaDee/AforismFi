import React, { FormEvent, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import './App.css';

function App() {
 

  const [response, setResponse] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  
    // TODO move to backend
  const conf = new Configuration({
    apiKey: 'dsafdafs'
  })
  const openai = new OpenAIApi(conf)

  async function onSubmit(event: any) {
    event.preventDefault();
    const input = event.target['text'].value
    console.log('input', input)

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "Hello world",
    })
    console.log(response)

    if (response.data.choices[0].text) {
      setResponse(response.data.choices[0].text)
    } else {
      console.log('fail')
    }    
  }

  async function onSubmitImage(event: any) {
    event.preventDefault();
    const input = event.target['text'].value
    console.log('input', input)

    const response = await openai.createImage({
      prompt: input,
      size: '512x512',

    })
    console.log(response)

    if (response.data.data[0].url) {
      setImageUrl(response.data.data[0].url ?? '')
    } else {
      console.log('fail')
    }
  }

  function loadCanvas() {
    console.log('loading')
    var canvas = document.getElementById("c") as HTMLCanvasElement;
    console.log('canvas', canvas)
    if (canvas) {
      var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      var image = new Image();
      image.onload = function() {
          console.log('onload started')
          ctx.drawImage(image, 0, 0);
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.fillRect(12, 256, 488, 248)
          const text = " öri öri öri\n sed do eiusmod tempor incididunt ut labore et dolore \n magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \n ullamco laboris nisi ut aliquip ex ea commodo consequat."
          var lines = text.split('\n');
          ctx.fillStyle = 'black'
          ctx.font = "48px serif";
          ctx.fillText(lines[0], 18, 280, 474)
          ctx.fillText(lines[1], 18, 310, 474)
          ctx.fillText(lines[2], 18, 340, 474)
          ctx.fillText(lines[3], 18, 370, 474)
          console.log('onload done')

      };
      image.src = 'sfdasadf'}
  }


  

  return (
    <div>

      <h1>AforismFi</h1>
      <form onSubmit={onSubmit}>
        <input type ='text' id='text'></input>
        <button>Submit</button>
      </form>
      <p>image</p>
      <form onSubmit={onSubmitImage}>
        <input type ='text' id='text'></input>
        <button>Submit</button>
      </form>
      <p>Response: {response}</p>
      <p><button onClick={loadCanvas}>load</button></p>
      <canvas id='c' height='512' width='512'></canvas>
    </div>
  )
}

export default App;
