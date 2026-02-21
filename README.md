# devfinder

A sleek GitHub profile explorer built with React. Search any GitHub username and instantly view their profile, repositories, language stats, and followers — with a polished glassmorphism UI and light/dark theme support.

[![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled--components-5-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/)
[![GitHub API](https://img.shields.io/badge/GitHub-REST%20API-181717?logo=github&logoColor=white)](https://docs.github.com/en/rest)

---

## Features

- **User search** — Search any GitHub username and view their full profile
- **Live suggestions** — Debounced autocomplete dropdown as you type
- **Recent searches** — Last 5 searches saved locally, each removable with ×
- **URL deep linking** — Share a profile link directly (e.g. `?user=torvalds`)
- **Top repositories** — Sortable by stars, forks, or last push; filterable by language
- **Language statistics** — Visual bar showing language distribution across repos
- **Follower list** — Click the followers count to browse followers in a modal
- **Copy & share** — One-click copy of username or shareable profile URL
- **Glassmorphism UI** — Blurred, translucent card design with smooth transitions
- **Light / dark theme** — Auto-detects system preference, toggle anytime
- **Skeleton loading** — Shimmer placeholder while data is fetching
- **Responsive layout** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 17 |
| Styling | styled-components v5 |
| Icons | react-icons (Material, Font Awesome, Bootstrap) |
| Grid / layout | Bootstrap 5 |
| Data | GitHub REST API v3 |
| Font | Source Code Pro (Google Fonts) |

---

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/psonH/devfinder.git
cd devfinder
npm install
```

### Running locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

> **Note:** If you're on Node.js v17+ you may see an OpenSSL error. The start script already handles this automatically via `cross-env NODE_OPTIONS=--openssl-legacy-provider`.

### Building for production

```bash
npm run build
```

Output goes to the `build/` folder, ready to deploy on any static host (GitHub Pages, Vercel, Netlify, etc.).

---

## Usage

1. Type a GitHub username in the search bar — suggestions appear after 2 characters
2. Select a suggestion or press Enter / click the search icon
3. View the user's profile, stats, repositories, and language breakdown
4. Click the **Followers** count to open the follower list modal
5. Use **Copy** to copy the username, or **Share** to copy a direct link to that profile
6. Recent searches appear as chips below the search bar — click to re-search, × to remove
7. Toggle light/dark mode with the icon in the top-right corner

---

## Project Structure

```
src/
├── App.js              # Root component — search, suggestions, recent chips, theme
├── User.jsx            # Profile card — stats, copy/share, info grid
├── RepoList.jsx        # Repo grid with sort and language filter
├── LangStats.jsx       # Language distribution bar
├── FollowerList.jsx    # Follower modal (triggered from User stats)
├── Skeleton.jsx        # Shimmer loading placeholder
├── GetUser.js          # GitHub API calls (getUser, getRepos, getFollowers, searchUsers)
├── GetDate.js          # Date formatting utility
├── themes.js           # Light/dark theme tokens + global styles
└── index.css           # Animations and shared CSS classes
```

---

## API Reference

All data is fetched from the public [GitHub REST API](https://docs.github.com/en/rest). No authentication token is required, though unauthenticated requests are rate-limited to **60 requests/hour** per IP.

| Endpoint | Used for |
|---|---|
| `GET /users/{username}` | Profile info, bio, stats |
| `GET /users/{username}/repos` | Top repositories (sorted by stars) |
| `GET /users/{username}/followers` | Follower list |
| `GET /search/users?q={query}` | Live search suggestions |

---

## License

This project is open source and available under the [MIT License](LICENSE).
