# knowledge-base

> A structured collection of technical resources — built to learn from, not just link to.

Live at → [edu.5pyd3r.org](https://edu.5pyd3r.org)

---

## What This Is

A self-hosted knowledge base for technical subjects — networking, operating systems, security, and whatever comes next. Every entry is something worth studying, not just bookmarking.

No ads. No tracking. No fluff.

---

## Stack

Pure HTML/CSS/JS. No frameworks. No build tools. No dependencies.  
Content lives in a single `data.json` — edit it, push, done.

---

## Structure

```
knowledge-base/
├── index.html        # markup
├── style.css         # styling
├── script.js         # renders entries from data.json
├── data.json         # source of truth
└── {slug}/           # each resource lives in its own subfolder
    └── index.html
```

---

## Adding a Resource

Open `data.json` and append an entry:

```json
{
  "title": "Resource Title",
  "slug": "folder-name",
  "description": "One line. What it teaches, not what it is.",
  "topic": "networking",
  "type": "course",
  "tags": ["tag1", "tag2", "tag3"],
  "status": "live"
}
```

### Fields

| Field | Required | Description |
|---|---|---|
| `title` | ✅ | Display name |
| `slug` | ✅ | Subfolder name — links to `./slug/` |
| `description` | ✅ | One-liner, keep it tight |
| `topic` | ✅ | Drives the filter buttons |
| `type` | ✅ | `course` · `paper` · `guide` · `reference` |
| `tags` | ❌ | Array of strings, max 3 shown on card |
| `status` | ✅ | `live` · `down` · `unstable` · `archived` |

### Status Values

| Value | Meaning |
|---|---|
| `live` | Available and complete |
| `down` | Temporarily unavailable |
| `unstable` | Work in progress, may be incomplete |
| `archived` | No longer maintained |

---

## Adding a Resource Page

Each resource lives in its own subfolder matching the `slug`:

```
knowledge-base/
    └── bits-to-bandwidth/
        ├── index.html
        └── ...
```

The landing page automatically links to `./slug/` when a card is clicked.

---

## Deployment

Hosted on **Cloudflare Pages** via this repo.  
Every push to `main` triggers an automatic redeploy.

No build command. Output directory: `/`

---

## License

Licensed under the [Apache License 2.0](LICENSE).

---

*Maintained by [5pyD3R](https://github.com/3rr0r-505) · [5pyd3r.org](https://5pyd3r.org)*
