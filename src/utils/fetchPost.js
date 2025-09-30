export const fetchPost = async (topic) => {
  if (!topic || !topic.title || !topic.about) {
    throw new Error("Topic must have both title and about properties");
  }

  const { title, about } = topic;

  const prompt = `Write a detailed, friendly, and engaging blog post on the topic "${title}". Cover the following points: ${about}. Include practical examples and explanations where relevant. The post should be approximately 800-1000 words long. Format the output in Markdown.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a skilled technical writer and developer writing detailed blog posts.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Extract AI-generated content
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content returned from OpenAI API.");

    return content.trim();
  } catch (error) {
    console.error("Error fetching post:", error);

    // Return fallback content with error details for debugging
    return `# ${title}\n\n${about}\n\n*AI content could not be fetched. Error: ${error.message}*`;
  }
};
