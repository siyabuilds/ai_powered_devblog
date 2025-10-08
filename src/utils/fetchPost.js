export const fetchPost = async (topic) => {
  if (!topic || !topic.title || !topic.about) {
    throw new Error("Topic must have both title and about properties");
  }

  const { title, about } = topic;

  const prompt = `
Write a detailed, friendly, and engaging blog post on the topic: "${title}".
Cover the following points: ${about}.
Include practical examples, relatable explanations, and where appropriate, short code snippets.

Tone:
- Conversational yet knowledgeable
- Uses everyday developer language
- Feels like a mentor explaining things clearly

Formatting:
- Use Markdown headings, subheadings, and lists
- Avoid adding a "Comments" or "Discussion" section
- End with a short summary or takeaway paragraph

Length:
Around 1500–2000 words.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a skilled technical writer and content creator. Write detailed, friendly, and engaging blog posts optimized for clarity, readability, and web consumption.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 3000,
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
