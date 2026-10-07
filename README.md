# Restaurant Waitlist System

This repository contains a small restaurant waitlist app built with Next.js.

For the main project documentation and setup instructions, see the project README in the `resturant-waitlist-system-project` folder.

## Project overview

The app lets guests join a waitlist, receive a ticket number, and check how many parties are ahead. Staff members can log in to a protected dashboard and see the current waiting parties.

## Stack

- Next.js
- React + TypeScript
- SQLite for local data storage
- JWT-based staff authentication

## Quick start

```bash
cd resturant-waitlist-system-project
cp .env.example .env.local
npm install
npm run dev
```

Then open http://localhost:3000

## Main features

- Guest waitlist registration
- Ticket-based queue tracking
- Staff login and dashboard
- SQLite-backed data layer

## Notes

This is a lightweight MVP designed for local development and demo use. For production, you would typically move from SQLite to a more scalable database and add stronger operational safeguards.