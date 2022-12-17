import React, { FormEvent, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import './App.css';

function App() {
 

  const [response, setResponse] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  
    // TODO move to backend
  const conf = new Configuration({
    apiKey: 'dfsdfsdfsaf'
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
    })
    console.log(response)

    if (response.data.data[0].url) {
      setImageUrl(response.data.data[0].url)
    } else {
      console.log('fail')
    }
  }


  return (
    <div>
      <h1>Hi!</h1>
      <form onSubmit={onSubmit}>
        <input type ='text' id='text'></input>
        <button>Submit</button>
      </form>
      <p>image</p>
      <form onSubmit={onSubmitImage}>
        <input type ='text' id='text'></input>
        <button>Submit</button>
      </form>
      {imageUrl && <img alt='openai-img' src={imageUrl}></img>}
    </div>
  )
}

export default App;
