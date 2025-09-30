import { getNextTopic } from "./topicTracker.js";
import { fetchPost } from "./fetchPost.js";
import { savePost } from "./savePost.js";

const fetchAndSavePost = async () => {
  try {
    // Get the next topic
    const topic = getNextTopic();

    // Fetch the post content from OpenAI
    const content = await fetchPost(topic);

    // Save the post to a markdown file
    const filePath = savePost(topic.title, topic.about, content);

    console.log(`Post titled "${topic.title}" saved to ${filePath}`);
  } catch (error) {
    console.error("Error in fetchAndSavePost:", error);
  }
};

fetchAndSavePost();
