import { Configuration, OpenAIApi } from 'openai';

export async function openAiCall(adjectives: string, topic: string) {
  const openai = setupOpenAi();
  const aphorism = await createAphorismFromInput(adjectives, topic, openai);
  const imagePrompt = await createDescriptionFromAphorism(aphorism, openai);
  const imageUrl = await createImageFromDescription(imagePrompt, openai);
  
  return {
    text: aphorism,
    url: imageUrl
  };
}

function setupOpenAi(): OpenAIApi {
  const conf = new Configuration({
    apiKey: process.env.API_KEY
  });
  const openai = new OpenAIApi(conf);
  return openai;
}

async function createAphorismFromInput(adjectives: string, topic: string, openai: OpenAIApi) {
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
    return '';
  }
  const aphorism = response.data.choices[0].text;
  return aphorism;
}

async function createDescriptionFromAphorism(aphorism: string, openai: OpenAIApi) {
  const imageDescriptionPrompt = `Create a description of a background image fitting the mood of the aphorism ${aphorism}`;

  const descResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: imageDescriptionPrompt,
    max_tokens: 256
  });

  console.log(descResponse);
  
  if (!descResponse.data.choices[0].text) {
    console.log('fail');
    return '';
  }
  const imagePrompt = descResponse.data.choices[0].text;
  return imagePrompt;
}

async function createImageFromDescription(description: string, openai: OpenAIApi) {
  const imageResponse = await openai.createImage({
    prompt: description,
    size: '512x512',

  });
  console.log(imageResponse);
  
  if (!imageResponse.data.data[0].url) {
    console.log('fail');
    return '';
  }
  const imageUrl = imageResponse.data.data[0].url;
  return imageUrl;
}