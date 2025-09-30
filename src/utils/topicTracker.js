import fs from "fs";
import path from "path";
import { topics } from "./data/topics";

const TRACKER_FILE = path.join(
  process.cwd(),
  "src",
  "utils",
  "topicTracker.json"
);

// Recover last index from file or initialize to -1
const getLastIndex = () => {
  if (!fs.existsSync(TRACKER_FILE)) {
    return -1;
  }
  const data = fs.readFileSync(TRACKER_FILE, "utf-8");
  return JSON.parse(data).lastIndex;
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
