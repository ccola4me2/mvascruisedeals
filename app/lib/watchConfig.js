// Turns the "Watch this price" form on. The form sends to /api/watch, which needs
// the WATCH_DB D1 binding and the cron trigger in wrangler.jsonc. Leave this false
// until the database exists, so the page never shows a form that cannot work.
export const WATCH_ENABLED = true;
