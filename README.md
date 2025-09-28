# Themes

This repository contains custom themes for my homelab apps, such as Jellyfin and Uptime Kuma. Each app can have multiple themes, and all themes are managed and built together for easy development and deployment.

## Supported Apps & Themes

Here are the currently supported apps and their themes, there may be more in the future:

- **Jellyfin**: Violetfin
- **Uptime Kuma**: Violetkuma

## Installation

### Jellyfin (Violetfin)

1. Go to Jellyfin `Settings > Dashboard > General > Custom CSS`
2. Paste this CSS code into the Custom CSS input:

   ```css
   @import url('https://ccrsxx.github.io/themes/public/jellyfin/violetfin/style.css');
   ```

3. Click Save

Optional: Violetfin makes heavy use of Backdrops with moving animations. Enable it in `Settings > Display > Backdrops`. For enabling backdrops for all users, see [this tutorial](https://github.com/BobHasNoSoul/jellyfin-mods#force-backdrops-for-all-users-108x).

### Uptime Kuma (Violetkuma)

1. Go to your status page and click `Edit Status Page` (you must be logged in).
2. Paste this HTML code into the Footer Text input:

   ```html
   <ul class="circles">
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
   </ul>
   ```

3. Paste this CSS code into the Custom CSS input:

   ```css
   @import url('https://ccrsxx.github.io/themes/public/uptime-kuma/violetkuma/style.css');
   ```

4. Click Save

---

## Development

### Project Structure

Themes are organized by app and theme name:

```bash
src/apps/{app}/{theme}/index.scss
public/{app}/{theme}/style.css
```

For example:

- `src/apps/jellyfin/violetfin/index.scss` → `public/jellyfin/violetfin/style.css`
- `src/apps/uptime-kuma/violetkuma/index.scss` → `public/uptime-kuma/violetkuma/style.css`

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ccrsxx/themes.git
   cd themes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the dev watcher:

   ```bash
   npm run dev
   ```

### Using Local Development CSS

Paste the following into your app's custom CSS input to use the local build:

For Jellyfin Violetfin:

```css
@import url('http://localhost:3000/public/jellyfin/violetfin/style.css');
```

For Uptime Kuma Violetkuma:

```css
@import url('http://localhost:3000/public/uptime-kuma/violetkuma/style.css');
```

For Uptime Kuma, use the same HTML snippet for the Footer Text input as in the installation section.

### Adding a New Theme

1. Create a new folder under `src/apps/{app}/{theme}` and add an `index.scss`.
2. The build and dev scripts will automatically pick up new themes and output to the correct location in `public/{app}/{theme}/style.css`.
