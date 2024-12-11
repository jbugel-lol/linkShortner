# Link Shortener (WIP)

## A sleek, secure, and privacy-focused link shortener built with SvelteKit.

### Overview

Welcome to the Link Shortener Project, a minimal and elegant solution for managing your URLs. Designed with privacy in mind, it features:

•	A secure login system with password authentication.

•	A modern, stylish interface inspired by the Catppuccin Mocha theme.

•	Minimal tracking for a privacy-first experience.

•	Free and Open Source Software (FOSS) under the MIT License.

## Getting Started

### Prerequisites

Ensure you have the following installed:

•	Node.js (version 16+ recommended)

•	npm

### Setup
1.	Clone the Repository

```bash
git clone https://github.com/jbugel-lol/linkShortner.git
cd linkShortner
```

2. Install Dependencies

```bash
npm install
```

3.	Configure Environment Variables: Copy the provided .env.example file:

```bash
cp .env.example .env
```

Fill in the necessary values, such as database credentials.

4.	Run the Project in Development Mode

```bash
npm run dev
npx prisma init
```

This starts the development server at http://localhost:5173 and initializes the database.

## Features
•	Minimal Tracking: Ensuring your data stays private.

•	Customizable: Tailored for your needs with database and environment configurations.

•	Stylish Design: Inspired by the Catppuccin Mocha theme.

## Development Notes
•	Database Setup:

Use the schema provided in /prisma/schema.prisma to initialize your database. Compatible with SQLite and Prisma ORM.

•	Favicons Fetching:

Favicon updates are asynchronous. A delay may occur in displaying updated icons for newly added links.

## Contribution

We welcome contributions! Whether it’s fixing bugs, suggesting features, or refining existing functionality, we’d love your help.
1.	Fork the repo and clone your copy.
2.	Create a feature branch.
3.	Commit your changes with meaningful messages.
4.	Push your branch and open a pull request.

## Acknowledgments

Special thanks to InspectorRex for the ongoing help. ❤️
