import { Configuration, OpenAIApi } from 'openai';

export async function openAiCall(adjectives: string, topic: string) {
  const conf = new Configuration({
    apiKey: process.env.API_KEY
  });
  const openai = new OpenAIApi(conf);

  const prompt = `Create a ${adjectives} aphorism on the topic of ${topic}`;
  console.log('prompt', prompt);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 256
  });
  console.log(response);

  if (!response.data.choices[0].text) {
    console.log('fail');
    return;
  }
  const aphorism = response.data.choices[0].text;

  const imageDescriptionPrompt = `Create a description of a background image fitting the mood of the aphorism ${aphorism}`;

  const descResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: imageDescriptionPrompt,
    max_tokens: 256
  });

  console.log(descResponse);
  
  if (!descResponse.data.choices[0].text) {
    console.log('fail');
    return;
  }
  const imagePrompt = descResponse.data.choices[0].text;

  const imageResponse = await openai.createImage({
    prompt: imagePrompt,
    size: '512x512',

  });
  console.log(imageResponse);
  
  if (!imageResponse.data.data[0].url) {
    console.log('fail');
    return;
  }
  
  return {
    text: aphorism,
    url: imageResponse.data.data[0].url
  };
}