import React, { FormEvent, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import './App.css';
import axios from 'axios'


function App() {
 

  const [response, setResponse] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  
    // TODO move to backend
  const conf = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY
  })
  const openai = new OpenAIApi(conf)

  // async function onSubmit(event: any) {
  //   event.preventDefault();
  //   const adjectives = event.target['adjectives'].value
  //   const topic = event.target['topic'].value
  //   const prompt = `Create a ${adjectives} aphorism on the topic of ${topic}`;
  //   console.log('prompt', prompt)

  //   const response = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt,
  //     max_tokens: 256
  //   })
  //   console.log(response)

  //   if (!response.data.choices[0].text) {
  //     console.log('fail')
  //     return;
  //   }
  //   const aphorism = response.data.choices[0].text;

  //   setResponse(aphorism);

  //   const imageDescriptionPrompt = `Create a description of a background image fitting the mood of the aphorism ${aphorism}`

  //   const descResponse = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: imageDescriptionPrompt,
  //     max_tokens: 256
  //   })

  //   console.log(descResponse)
    

  //   if (!descResponse.data.choices[0].text) {
  //     console.log('fail')
  //     return;
  //   }
  //   const imagePrompt = descResponse.data.choices[0].text

  //   const imageResponse = await openai.createImage({
  //     prompt: imagePrompt,
  //     size: '512x512',

  //   })
  //   console.log(imageResponse)
  //   if (imageResponse.data.data[0].url) {
  //     setImageUrl(imageResponse.data.data[0].url ?? '')
  //   } else {
  //     console.log('fail')
  //   }
  // }
  async function onSubmit(event: any) {
    event.preventDefault();
    const adjectives = event.target['adjectives'].value
    const topic = event.target['topic'].value

    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/aphorism`)
    setResponse(result.data.text)
    setImageUrl(result.data.url)
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
          
          var lines = splitText(response);
          ctx.fillStyle = 'black'
          ctx.font = "48px serif";
          lines.forEach((line, index) => {
            ctx.fillText(line, 18, 300 + (index * 40), 474)
          })
          console.log('onload done')

      };
      image.src = imageUrl
      // image.src = 'test.png'
    }
  }
  return (
    <div>

      <h1>AforismFi</h1>
      <form onSubmit={onSubmit}>
        <label>Create a</label>
        <input type ='text' id='adjectives'></input>
        <label>aphorism on the topic of</label>
        <input type ='text' id='topic'></input>
        <button>Submit</button>
      </form>
      <p>Response: {response}</p>
      <p><button onClick={loadCanvas}>load</button></p>
      <canvas id='c' height='512' width='512'></canvas>
    </div>
  )
}

export default App;


function splitText(text: string): string[] {
  const lineLength = 50;

  const lines: string[] = []
  
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start+lineLength, text.length)
    lines.push(text.substring(start, end))
    start += lineLength;
  }

  return lines;
}