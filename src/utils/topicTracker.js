import fs from "fs";
import path from "path";
import { topics } from "./data/topics.js";

const TRACKER_FILE = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "data",
  "topicTracker.json"
);

// Recover last index from file or initialize to -1
const getLastIndex = () => {
  if (!fs.existsSync(TRACKER_FILE)) {
    return -1;
  }

  try {
    const fileContent = fs.readFileSync(TRACKER_FILE, "utf-8");

    // Handle empty file
    if (!fileContent.trim()) {
      return -1;
    }

    const data = JSON.parse(fileContent);
    return data.lastIndex !== undefined ? data.lastIndex : -1;
  } catch (error) {
    console.warn("Error reading tracker file, resetting to -1:", error.message);
    return -1;
  }
};

// Save the current index to file
const saveLastIndex = (index) => {
  fs.writeFileSync(TRACKER_FILE, JSON.stringify({ lastIndex: index }), "utf-8");
};

// Get the next topic in a round-robin fashion
export const getNextTopic = () => {
  const lastIndex = getLastIndex();
  const nextIndex = (lastIndex + 1) % topics.length;
  saveLastIndex(nextIndex);
  return topics[nextIndex];
};
