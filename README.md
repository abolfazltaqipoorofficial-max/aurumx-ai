# AURUMX AI — Full-Stack Starter

A production-oriented starter for a global AI market-intelligence platform.

## Included
- Dark/gold responsive dashboard
- Email/password login UI
- User dashboard
- Admin dashboard UI
- XAUUSD market panel
- Global breaking-news panel
- Economic calendar panel
- AI trade-analysis panel
- AI chat interface
- Risk calculator
- Alerts/watchlist/journal UI
- Backend API scaffold
- Secure environment-variable pattern for AI/data provider keys

## Run locally
Requires Node.js 20+.

1. `npm install`
2. Copy `.env.example` to `.env`
3. Put your provider keys in `.env`
4. `npm run dev`
5. Open `http://localhost:3000`

This starter intentionally does not include real provider keys. Before public launch, connect licensed market/news/calendar data providers and a production database/auth system. Never expose API secrets in browser code.

The AI output is designed as market scenarios with entry/stop/targets and reasons, not guaranteed predictions or automatic execution.
