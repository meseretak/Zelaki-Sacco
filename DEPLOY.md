# Deployment Guide — ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ (Sustainable SACCO)

## Option A: cPanel (Node.js App)

### Prerequisites
- cPanel hosting with **Node.js** support (Setup Node.js App icon)
- SSH or File Manager access

### Steps

1. **Upload the project**
   - Zip your project folder (excluding `node_modules` and `.next`)
   - In cPanel → **File Manager** → upload to `home/username/sacco-site/`
   - Extract the zip

2. **Create the Node.js app**
   - cPanel → **Setup Node.js App**
   - **Node.js version**: 20.x or 22.x
   - **Application mode**: Production
   - **Application root**: `sacco-site`
   - **Application URL**: your domain
   - Click **Create**

3. **Install dependencies**
   - In the Node.js app panel, click **Run NPM Install**
   - Or via SSH: `cd ~/sacco-site && npm install --production`

4. **Configure the environment**
   - In the Node.js app panel, add environment variables:
     ```
     DATABASE_URL=file:/home/username/sacco-site/db/custom.db
     NEXTAUTH_URL=https://yourdomain.com
     NODE_ENV=production
     ```
   - Or create a `.env` file in the project root with the above

5. **Set up the database**
   - Via SSH or the cPanel terminal:
     ```
     cd ~/sacco-site
     npx prisma db push
     npx prisma generate
     node prisma/seed.ts        # seeds settings, nav, pages, demo member
     node prisma/seed-menu.ts   # seeds the menu hierarchy + content pages
     ```
   - The SQLite database file will be created at `db/custom.db`

6. **Build & start**
   - Build: `npm run build` (or `npx next build`)
   - The cPanel Node.js app should auto-start with `npm start`
   - If needed, set the **Application startup file** to `.next/standalone/server.js`

7. **Set the port**
   - cPanel Node.js apps run on a assigned port (shown in the panel)
   - The app listens on the port from the `PORT` env var or 3000

### Database
- The database is a **SQLite** file at `db/custom.db`
- To download/backup: File Manager → `sacco-site/db/custom.db` → Download
- To reset: delete `db/custom.db` and re-run `prisma db push` + seeds

---

## Option B: VPS / Docker

```bash
# Clone and install
git clone <your-repo> sacco-site && cd sacco-site
npm install

# Configure
cp .env.example .env
# edit .env with your DATABASE_URL

# Database
npx prisma db push
npx prisma generate
node prisma/seed.ts
node prisma/seed-menu.ts

# Build & run
npm run build
npm start   # listens on port 3000
```

Use a reverse proxy (nginx/Caddy) to route your domain to port 3000.

---

## Admin Access
- URL: `https://yourdomain.com/?view=admin`
- Passcode: `admin123` (change it in Admin → Settings → Security)

## Member Portal
- URL: `https://yourdomain.com/?view=login`
- Demo member: `member@sustainable.com` / `demo123`

## Admin → Members Management
- Admin → Members tab → **click any member row** to open the full management panel:
  - View/edit balances (compulsory, voluntary, child, time deposit, shares)
  - Add transactions (deposit, withdrawal, interest, dividend, loan payment, etc.)
  - Monthly compulsory savings tracking (12-month grid)
  - Add loans + record monthly payments (auto-updates remaining balance)
  - View transaction history

## Environment Variables (.env)
```
DATABASE_URL=file:/path/to/db/custom.db
```
