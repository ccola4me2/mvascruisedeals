// Turns the email digest signup box on the trends page on. The box posts to /api/digest,
// which needs the WATCH_DB D1 binding (it makes its own table on first use) and the same
// cron trigger as the price watch. Leave this false until the sample email has been
// approved, so the page never shows a box before Brent has seen what it sends.
export const DIGEST_ENABLED = false;
