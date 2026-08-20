# Agent Quiz — Eval Harness: Article Trials

A study-quiz game covering Anthropic's agent-engineering articles: **Building Effective Agents**, **Effective Context Engineering for AI Agents**, **Writing Tools for Agents**, **Introducing the Model Context Protocol**, and **Demystifying Evals for AI Agents**.

Pick an article, run its multiple-choice "trial," read the reasoning behind every option (not just the one you picked), and review study notes for each piece. Anything you miss is saved locally so it collects into a cross-article review deck you can drill later.

**[Live demo →](https://lee-brian.github.io/agent-quiz/)** *(once GitHub Pages is enabled — see below)*

## Features

- **5 article quizzes**, each with per-question categories and a full explanation for every answer choice, right or wrong.
- **Study notes** per article — a paraphrased summary you can read before or instead of the quiz.
- **Missed-concept review** — anything you get wrong is saved to `localStorage` and resurfaces in a standalone cross-article review deck. Review passes are logged but never clear an item from history.
- **Keyboard shortcuts** — `1`–`4` / `A`–`D` pick an option, `Enter` / `→` advances, `Esc` closes the settings panel.
- **Streak tracking** — a 🔥 streak counter during a run, with your best streak called out in the results.
- **Light / dark theme toggle**, saved per browser.
- **Optional AI follow-ups** — on any answer, ask a free-text follow-up question and get a short explanation back from the Claude API. This requires your own Anthropic API key, pasted into the settings panel (⚙ in the header). The key is stored only in your browser's `localStorage` and is sent only to `api.anthropic.com` — it never touches this repo or any server. Get a key at [console.anthropic.com](https://console.anthropic.com/settings/keys). Without a key, the rest of the app works exactly the same; only that one optional feature is disabled.
- **Export progress** as JSON from the home screen.

## Running it

No build step — it's static HTML/CSS/JS. Any of these work:

```bash
# open directly
open index.html

# or serve it locally
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

Settings → Pages → Deploy from a branch → `main` / `/ (root)`. `index.html` is already at the repo root, so no further config is needed.

## Project structure

```
index.html   — page shell, header, settings panel
style.css    — all styling (dark theme by default, light theme via data-theme)
app.js       — question banks, quiz engine, storage, settings, keyboard shortcuts
```

## Privacy / data

All progress (missed questions, theme choice, and the optional API key) lives in your browser's `localStorage`. Nothing is sent anywhere except the optional "ask a follow-up" call, which goes straight from your browser to `api.anthropic.com` using your own key.
