# Link Shortener (Work in Progress, also applies to this README)

## Overview

Welcome to our Link Shortener project built using SvelteKit! Our link shortener offers minimal tracking, keeping your data private. We've designed it with a sleek and stylish interface inspired by the [Catppuccin Mocha theme](https://github.com/catppuccin/catppuccin#-palette). As part of our commitment to openness, this project is Free and Open Source Software (FOSS). We've also implemented a secure login page with password authentication for added protection.

---
# Stats

![GitHub last commit](https://img.shields.io/github/last-commit/jbugel-lol/linkShortner?display_timestamp=committer&logo=github)
![GitHub repo size](https://img.shields.io/github/repo-size/jbugel-lol/linkShortner)

---

## Getting Started

To get started with our link shortener, follow these simple steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/jbugel-lol/linkShortner.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd linkShortner
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Build the Project:**

   ```bash
   npm run build
   ```

5. **Run the Project:**

   ```bash
   node build
   ```

   _Note: Make sure to configure your Nginx or Apache2 server to listen to the port specified in the console output, typically 3000._

## Additional Configuration

To use our link shortener effectively, there are a couple of additional steps to take:

- **Database Setup:**
  You'll need to set up your own database and configure it according to your needs.

- **Environment Variables:**
  Fill out the provided `.env.example` file and rename it to `.env` with your specific configuration. Make sure to prefix all environment variables with `VITE_`, as Vite requires this prefix for proper export.

## How to Use

To make use of our link shortener, simply visit `localhost:4173` or the domain you've configured. Our user-friendly interface makes it easy to create and manage your shortened links hassle-free.

## Contributions

While we currently don't have specific guidelines for contributions, we welcome your involvement! Feel free to fork the project and submit pull requests for any improvements or fixes you'd like to contribute. Together, we can make this link shortener even better.

### Thanks for the help, InspectorRex ❤️
