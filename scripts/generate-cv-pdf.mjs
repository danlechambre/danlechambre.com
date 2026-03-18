import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const PREVIEW_URL = "http://localhost:4321";
const CV_PATH = "/cv";
const OUTPUT_DIR = new URL("../public/assets", import.meta.url);
const OUTPUT_FILE = new URL("dan-chambers-cv.pdf", OUTPUT_DIR + "/");

// Start the preview server
console.log("Starting preview server...");
const server = spawn("npm", ["run", "preview"], {
  stdio: "ignore",
  detached: true,
});

// Wait for the server to be ready
async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error(`Server at ${url} did not start in time`);
}

try {
  await waitForServer(PREVIEW_URL);
  console.log("Server ready.");

  // Generate the PDF
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${PREVIEW_URL}${CV_PATH}`, { waitUntil: "networkidle" });

  await mkdir(new URL(".", OUTPUT_FILE), { recursive: true });

  const outputPath = new URL(".", OUTPUT_FILE).pathname + "dan-chambers-cv.pdf";
  await page.pdf({
    path: outputPath,
    preferCSSPageSize: true,
    printBackground: true,
  });

  await browser.close();
  console.log(`PDF saved to ${outputPath}`);
} finally {
  // Kill the preview server process group
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
}
