# Add Portfolio Project

Add a new project to the portfolio site following the established patterns.

## Project Data Schema

**File:** `src/data/projects.ts`

```typescript
export interface Project {
  title: string;           // Project name (required)
  description: string;     // Short 1-2 sentence summary (required)
  longDescription?: string; // Extended description for featured projects
  tech: string[];          // Array of technology tags (required)
  github?: string;         // GitHub repository URL (optional)
  live?: string;           // Live deployment URL (optional)
  images?: {               // Screenshots (optional)
    light: string[];
    dark: string[];
  };
  featured: boolean;       // true = large card, false = small grid item
}
```

## Image Assets

**Directory:** `public/projects/[project-slug]/`

**Naming Convention:** `[NUMBER]-[SECTION-NAME]-[THEME].png`
- Example: `01-home-dark.png`, `02-dashboard-light.png`
- Both light and dark versions required
- Sequential numbering: `01-`, `02-`, etc.

## Steps to Add a Project

1. **Create image directory:**
   ```
   public/projects/[project-slug]/
   ```

2. **Add screenshots** (both themes):
   ```
   01-name-dark.png / 01-name-light.png
   02-name-dark.png / 02-name-light.png
   ```

3. **Add entry to `src/data/projects.ts`:**
   ```typescript
   {
     title: "Project Name",
     description: "Short description for cards",
     longDescription: "Extended description for featured view",
     tech: ["Tech1", "Tech2", "Tech3"],
     github: "https://github.com/...",
     live: "https://...",
     images: {
       dark: ["/projects/slug/01-name-dark.png"],
       light: ["/projects/slug/01-name-light.png"],
     },
     featured: true,
   }
   ```

## Display Behavior

| `featured` | Display |
|------------|---------|
| `true` | Large two-column layout with image gallery, shows `longDescription` |
| `false` | Small grid card, icon only, shows `description` |

## Current Projects

- SportsManager (featured, 7 images)
- CBOA Member Portal (featured, 5 images)
- Quest Canada Analytics (featured, 4 images)
- ChordApp (featured, 4 images)
- React Annotator (not featured)
- CANsense Monitoring (not featured)

---

**User Request:** $ARGUMENTS
