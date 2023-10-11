async function generateResponse(openai, text) {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.3,
    });
    return { result: completion.data.choices[0].text };
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

export default generateResponse;
