# Proyect clone discord
## Tools
- Next 13
- React js
- Tailwind
- Socket IO
- Prisma
- Shadcn UI

## Feature
- Real-time messaging through Socket.io
- Authentication via Clerk
- Sending attachments as messages with UploadThing
- Real-time message deletion and editing for all users
- Creating Text, Audio, and Video call channels
- One-on-one conversations between members
- One-on-one video calls between members
- Managing members (kick, role change, guest/moderator)
- Generating unique invite links and a fully functional invite system
- Infinite message loading in batches of 10 (using tanstack/query)
- Server creation and customization
- Elegant UI design with TailwindCSS and ShadcnUI
- Full responsiveness and mobile-friendly UI
- Light and Dark mode support
- Websocket fallback: Polling with alerts
- ORM implementation using Prisma
- MySQL database integration through Planetscale

## Install
- Clone the repository
```
  git clone https://github.com/EdwardMelendezM/Discord-clone
```

- Install dependencies
```
  npm i
```

- Setup .env
```
  touch .env
  cp .env.local .env
```

- Setup Prisma
```
  npx prisma generate
  npx prisma db push
```

- Start the app
```
  npm run dev
```