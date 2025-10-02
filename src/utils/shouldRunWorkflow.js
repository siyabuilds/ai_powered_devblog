import fs from "fs";
import path from "path";

const TRACKER_FILE = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "data",
  "workflowTracker.json"
);

const HOURS_36_IN_MS = 36 * 60 * 60 * 1000; // 36 hours in milliseconds

// Get the last run timestamp
const getLastRan = () => {
  if (!fs.existsSync(TRACKER_FILE)) {
    return 0;
  }

  try {
    const fileContent = fs.readFileSync(TRACKER_FILE, "utf-8");

    // Handle empty file
    if (!fileContent.trim()) {
      return 0;
    }

    const data = JSON.parse(fileContent);
    return data.lastRan || 0;
  } catch (error) {
    console.warn("Error reading workflow tracker file, resetting to 0:", error.message);
    return 0;
  }
};

// Update the last run timestamp
const updateLastRan = (timestamp) => {
  fs.writeFileSync(TRACKER_FILE, JSON.stringify({ lastRan: timestamp }), "utf-8");
};

// Check if 36 hours have elapsed since last run
const shouldRun = () => {
  const lastRan = getLastRan();
  const now = Date.now();
  const timeSinceLastRun = now - lastRan;

  console.log(`Last run: ${new Date(lastRan).toISOString()}`);
  console.log(`Current time: ${new Date(now).toISOString()}`);
  console.log(`Time since last run: ${(timeSinceLastRun / (60 * 60 * 1000)).toFixed(2)} hours`);

  if (lastRan === 0 || timeSinceLastRun >= HOURS_36_IN_MS) {
    console.log("36 hours have elapsed. Workflow should run.");
    updateLastRan(now);
    return true;
  }

  console.log("36 hours have not elapsed yet. Skipping workflow.");
  return false;
};

// Export for use in workflow
if (shouldRun()) {
  process.exit(0); // Success - should run
} else {
  process.exit(1); // Failure - should not run
}
