# ETHShala

**ETHShala** is a comprehensive, gamified learning platform designed to educate developers and enthusiasts on Ethereum Improvement Proposals (EIPs) and the core concepts shaping the Ethereum ecosystem.

---

## 🚀 Project Overview

The Ethereum ecosystem moves fast, and the protocol layer can be intimidating. **ETHShala** bridges this gap by normalizing the complex EIP lifecycle into structured, interactive learning modules. Users can:

- **Learn:** Master EIPs through curated lessons and modules.
- **Earn:** Gain XP and achievements for completing assignments and lessons.
- **Engage:** Join the Campus Ambassador Program (CAP) and refer friends to grow the community.
- **Redeem:** Spend earned XP in the Marketplace for exclusive rewards and NFTs.

---

## 🛠 Tech Stack

### Frontend (Web)
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Auth:** [Better Auth](https://www.better-auth.com/)
- **Web3:** Wagmi, Viem, RainbowKit
- **Icons:** Lucide React
- **Notifications:** Sonner

### Backend (API)
- **Framework:** [NestJS 11](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Security:** Helmet, Throttler, API Key Guard

### Architecture
- **Monorepo:** [Turborepo](https://turbo.build/)
- **Package Manager:** [pnpm](https://pnpm.io/)

---

## 📦 Monorepo Structure

```text
/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   └── database/     # Shared database utilities
└── prisma/           # Global Prisma schema & migrations
```

---

## 🏁 Getting Started

### Prerequisites
- **Node.js:** Latest LTS recommended
- **pnpm:** `pnpm add -g pnpm`
- **PostgreSQL:** A running instance (local or hosted)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   Copy `.env.example` in the root, `apps/web`, and `apps/api` to `.env` and fill in the required values.

### Database Setup
```bash
# Push schema to DB
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed the database (Modules, Assignments, Rewards)
cd apps/api && npx prisma db seed
```

### Development
Run all services in parallel:
```bash
pnpm dev
```

---

## 🗺 Roadmap (Audit Status)

We have recently completed an extensive system audit and refactor:

- [x] **Phase 1: Security** - Hardcoded credentials removed, dynamic CORS implemented.
- [x] **Phase 2: Standardization** - Atomic UI library built, strict typing enforced.
- [x] **Phase 3: LMS Logic** - DB-backed lesson tracking and difficulty-weighted skill radar.
- [x] **Phase 4: Community** - Standardized referral URL logic and polished empty states.
- [x] **Phase 5: Production Polish** - SEO/OpenGraph optimization and global toast system.

---

## 🤝 Contributing

We welcome contributions! Whether it's fixing a bug, adding a new EIP module, or improving the UI, feel free to open an issue or submit a PR.

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [UNLICENSED](./package.json) license.

---

**Built with ❤️ for the Ethereum Community.**
