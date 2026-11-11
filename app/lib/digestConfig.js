// Turns the email digest signup box on the trends page on. The box posts to /api/digest,
// which needs the WATCH_DB D1 binding (it makes its own table on first use) and the same
// cron trigger as the price watch. Switched on 2026-11-11 after Brent approved the sample email.
export const DIGEST_ENABLED = true;
