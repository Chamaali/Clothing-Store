# Postman tests for Clothing-Store Chat API

This folder contains a Postman collection to test the chat endpoint at `/api/chat/send`.

Files
- `ChatAPI.postman_collection.json` — Postman collection you can import into Postman.

Requests included
- KB Match - Shipping: Tests that knowledge-base answers are returned (source === 'kb').
- Fallback reply: Tests the fallback when no external model key is present.
- Invalid payload: Sends a bad body and expects a 400 with an `error` field.
- Server error simulation: Special message `__trigger_server_error__` to assert the server returns either an error or a graceful reply.

How to use

1. Ensure your server is running locally on port `5000`.

2. Import the collection into Postman:

   - Open Postman → File → Import → Choose `ChatAPI.postman_collection.json`.

3. Run individual requests from the collection to verify behavior.

Run automated tests with Newman (optional)

If you have Node.js installed, install Newman globally (or use npx):

```powershell
npm install -g newman
# or use npx newman
```

Then run the collection:

```powershell
newman run docs/postman/ChatAPI.postman_collection.json --verbose
```

Notes & troubleshooting
- If your server uses environment variables (for ex. `GEMINI_API_KEY`), Postman tests assume the server is reachable at `http://localhost:5000` and that the server process environment determines model usage.
- The Server error simulation request expects the server to either return an HTTP 500 error or a graceful `reply` fallback. If you want deterministic error testing, temporarily modify `server/routes/chatRoutes.js` to throw when it sees the special trigger message.

If you'd like, I can also:
- Add a Postman environment file (with baseUrl) so you can switch between dev/staging easily.
- Create a CI job that runs Newman on every PR.
