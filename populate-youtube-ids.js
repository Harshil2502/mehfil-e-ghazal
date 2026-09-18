// populate-youtube-ids.js
//
// Fills in every `youtubeId: null` in ghazalPlaylist.js by querying the
// real YouTube Data API v3. This is the only reliable way to get 200
// correct video IDs — it looks up each song on YouTube itself instead
// of anyone guessing or inventing IDs.
//
// SETUP:
//   1. Get a free API key: https://console.cloud.google.com/
//      -> Enable "YouTube Data API v3" -> Create Credentials -> API key
//   2. npm install node-fetch   (if on Node <18; Node 18+ has fetch built in)
//   3. Run:  YOUTUBE_API_KEY=your_key_here node populate-youtube-ids.js
//
// NOTES:
//   - The free quota is 10,000 units/day; each search.list call costs
//     100 units, so 200 lookups = 20,000 units. Either run it across two
//     days, request a quota increase, or trim the list before running.
//   - The script picks the FIRST search result for each query. For a
//     handful of songs (very common titles, or ones with many covers)
//     you should manually sanity-check the chosen video afterward.
//   - Entries that already have a real youtubeId are left untouched.

import fs from "fs";

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("Missing YOUTUBE_API_KEY environment variable.");
  console.error("Usage: YOUTUBE_API_KEY=your_key_here node populate-youtube-ids.js");
  process.exit(1);
}

const INPUT_PATH = "./ghazalPlaylist.js";
const OUTPUT_PATH = "./ghazalPlaylist.populated.js";
const DELAY_MS = 250; // be polite to the API between calls

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchYoutubeId(title, artist) {
  const query = encodeURIComponent(`${title} ${artist !== "—" ? artist : ""} ghazal`.trim());
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=${query}&key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube API error ${res.status}: ${body}`);
  }
  const data = await res.json();
  if (data.items && data.items.length > 0) {
    return data.items[0].id.videoId;
  }
  return null;
}

async function main() {
  // Dynamically import the playlist (works since it's an ES module export)
  const { GHAZAL_PLAYLIST } = await import(INPUT_PATH);

  const results = [];
  let filled = 0;
  let skipped = 0;
  let failed = 0;

  for (const entry of GHAZAL_PLAYLIST) {
    if (entry.youtubeId) {
      skipped++;
      results.push(entry);
      continue;
    }

    try {
      const videoId = await searchYoutubeId(entry.title, entry.artist);
      if (videoId) {
        console.log(`✓ [${entry.id}] "${entry.title}" -> ${videoId}`);
        filled++;
        results.push({ ...entry, youtubeId: videoId });
      } else {
        console.warn(`✗ [${entry.id}] "${entry.title}" -> no result found`);
        failed++;
        results.push(entry);
      }
    } catch (err) {
      console.error(`✗ [${entry.id}] "${entry.title}" -> ERROR: ${err.message}`);
      failed++;
      results.push(entry);
    }

    await sleep(DELAY_MS);
  }

  const output =
    `// Auto-populated by populate-youtube-ids.js on ${new Date().toISOString()}\n` +
    `// Verify entries marked with a comment before trusting them blindly.\n\n` +
    `export const GHAZAL_PLAYLIST = ${JSON.stringify(results, null, 2)};\n\n` +
    `export default GHAZAL_PLAYLIST;\n`;

  fs.writeFileSync(OUTPUT_PATH, output, "utf-8");

  console.log("\n--- Summary ---");
  console.log(`Already had IDs: ${skipped}`);
  console.log(`Newly filled:    ${filled}`);
  console.log(`Failed/no match: ${failed}`);
  console.log(`Output written to: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
