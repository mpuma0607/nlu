export async function generateContent(formData: FormData) {
  // Placeholder for content generation logic
  console.log("Generating content...")
  const prompt = formData.get("prompt")
  console.log("Prompt:", prompt)

  // Simulate content generation
  const generatedContent = `This is some generated content based on the prompt: ${prompt}`

  return { content: generatedContent }
}
