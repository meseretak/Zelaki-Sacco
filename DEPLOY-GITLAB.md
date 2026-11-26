# Zelaki Sacco — GitLab + cPanel Deployment Guide

Deploy automatically to cPanel on every push to `main`.

---

## How it works

```
git push origin main
       │
       ▼
GitLab CI/CD (.gitlab-ci.yml)
  ├─ lint    — ESLint check
  ├─ build   — next build → .next/standalone/
  └─ deploy  — rsync to cPanel via SSH → prisma migrate → restart
```

---

## One-time setup (do this once)

### 1. Push project to GitLab

```bash
git remote add origin https://gitlab.com/YOUR_USERNAME/zelaki-sacco.git
git push -u origin main
```

---

### 2. Enable SSH access on cPanel

1. Log in to cPanel → **SSH Access** → enable SSH if not already on.
2. Generate a deploy key on your local machine:
   ```bash
   ssh-keygen -t ed25519 -C "gitlab-deploy" -f ~/.ssh/gitlab_deploy_key -N ""
   ```
3. In cPanel → **SSH Access** → **Manage SSH Keys** → **Import Key**:
   - Paste the contents of `~/.ssh/gitlab_deploy_key.pub`
   - Click **Import**, then **Authorize** the key.

---

### 3. Create the Node.js App in cPanel

1. cPanel → **Setup Node.js App** → **Create Application**:

   | Field | Value |
   |-------|-------|
   | Node.js version | `22.x` (or `20.x`) |
   | Application mode | `Production` |
   | Application root | `zelaki-sacco` |
   | Application URL | `yourdomain.com` |
   | Startup file | `.next/standalone/server.js` |

2. Click **Create**. Note the **port number** shown — you'll need it in step 5.
3. Using the Terminal button (or SSH), create required directories:
   ```bash
   mkdir -p ~/zelaki-sacco/db ~/zelaki-sacco/tmp ~/zelaki-sacco/public/uploads/cvs
   ```

---

### 4. Set GitLab CI/CD variables

Go to your GitLab project → **Settings → CI/CD → Variables → Expand → Add variable**.

| Variable | Value | Protected | Masked |
|----------|-------|-----------|--------|
| `SSH_PRIVATE_KEY` | Contents of `~/.ssh/gitlab_deploy_key` (the **private** key) | ✅ | ✅ |
| `CPANEL_HOST` | Your server hostname, e.g. `server123.hostingprovider.com` | ✅ | — |
| `CPANEL_USER` | Your cPanel username | ✅ | — |
| `CPANEL_APP_DIR` | `/home/YOUR_CPANEL_USER/zelaki-sacco` | — | — |
| `DATABASE_URL` | `file:/home/YOUR_CPANEL_USER/zelaki-sacco/db/custom.db` | ✅ | — |
| `NEXTAUTH_URL` | `https://yourdomain.com` | ✅ | — |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` and paste the output | ✅ | ✅ |

---

### 5. Set environment variables on cPanel

In cPanel → **Setup Node.js App** → **Edit** your app → **Environment variables**:

```
NODE_ENV          production
PORT              <port shown in the Node.js App panel>
DATABASE_URL      file:/home/YOUR_CPANEL_USER/zelaki-sacco/db/custom.db
NEXTAUTH_URL      https://yourdomain.com
NEXTAUTH_SECRET   <same value as the GitLab CI/CD variable>
```

Click **Save**.

---

### 6. First deploy — seed the database

After the first GitLab pipeline succeeds, SSH into the server and seed once:

```bash
ssh YOUR_CPANEL_USER@YOUR_SERVER_HOST
cd ~/zelaki-sacco

export DATABASE_URL="file:/home/YOUR_CPANEL_USER/zelaki-sacco/db/custom.db"

# Apply all migrations (creates the SQLite file and tables)
npx prisma migrate deploy

# Seed initial data
node prisma/seed.ts
node prisma/seed-menu.ts

echo "Done! Database is ready."
```

---

## Normal workflow (after setup)

Every push to `main` triggers a full deploy automatically:

```bash
# Make changes locally, then:
git add .
git commit -m "your message"
git push origin main
# → GitLab runs lint → build → deploy automatically
```

Watch the pipeline at: `https://gitlab.com/YOUR_USERNAME/zelaki-sacco/-/pipelines`

---

## Verifying a deployment

**On the server (SSH):**
```bash
# App process is running
ps aux | grep server.js

# App responds on its port
curl -s http://localhost:3000 | head -c 100

# Database file exists
ls -lh ~/zelaki-sacco/db/custom.db
```

**In the browser:**
1. `https://yourdomain.com` — homepage loads
2. `https://yourdomain.com/?view=admin` — admin login appears
3. `https://yourdomain.com/?view=login` — member login appears

---

## After first deployment

- [ ] Change admin passcode from `admin123` → Admin panel → Settings → Security
- [ ] Set up daily database backup in cPanel → **Cron Jobs**:
  ```
  0 2 * * * cp ~/zelaki-sacco/db/custom.db ~/backups/custom-$(date +\%Y\%m\%d).db
  ```
- [ ] Confirm all contact form / membership application API routes work
- [ ] Consider migrating from SQLite → MySQL if you expect heavy concurrent traffic

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Pipeline fails at `lint` | ESLint error in code | Fix the ESLint error locally, push again |
| Pipeline fails at `build` | TypeScript error or missing dep | Check pipeline logs; fix and push |
| Pipeline fails at `deploy` (SSH auth) | Wrong key or not authorized | Re-add public key in cPanel SSH Access |
| Site shows 502 / app not running | App crashed on startup | SSH in, run `node .next/standalone/server.js` manually to see the error |
| `NEXTAUTH_SECRET` error on login | Variable not set in cPanel panel | Add `NEXTAUTH_SECRET` in Node.js App → Environment variables |
| Database error on first load | Migrations not run | Run `npx prisma migrate deploy` via SSH (step 6 above) |
| `sharp` error in image routes | Native binary mismatch | SSH in, run `npm install sharp` inside the app directory |

---

## File reference

| File | Purpose |
|------|---------|
| `.gitlab-ci.yml` | CI/CD pipeline definition |
| `.env.example` | Documents all required environment variables |
| `.env` | Local development env vars — **never commit** |
| `prisma/schema.prisma` | Database schema |
| `prisma/seed.ts` | Initial data seed |
| `prisma/seed-menu.ts` | Menu data seed |
| `.next/standalone/server.js` | Production server entry point (generated by build) |
