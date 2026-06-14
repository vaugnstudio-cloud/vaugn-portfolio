# Project images

Drop the cover exports here using these EXACT filenames. The cards auto-swap
from placeholder to the real image the moment a matching file exists — no code
change needed (see `components/ProjectCard.tsx`).

| Filename               | Project                       | Live site |
| ---------------------- | ----------------------------- | --------- |
| `medsync-cover.jpg`    | MedSync                       | medsyncmentalhealth.com |
| `ozmax-cover.jpg`      | Ozmax Care                    | (Figma — not live) |
| `inbloom-cover.jpg`    | InBloom Therapy               | (staging in progress) |
| `acef-cover.jpg`       | ACEF Enterprises              | — |
| `ysc-cover.jpg`        | Your SocialChef               | yoursocialchef.com |
| `mekong-cover.jpg`     | Mekong Merchant of Taste      | mekongmerchant.com.au |
| `junk-cover.jpg`       | Junk Sunshine Coast           | junksunshinecoast.com.au |
| `yassas-cover.jpg`     | Yassas                        | yassas.com.au |
| `feedme-cover.jpg`     | FeedMe Group                  | feedmegroup.com.au |
| `plumb-cover.jpg`      | PlumbYourWay                  | plumbyourway.com.au |
| `vaugn-photo.jpg`      | (reserved — hero/about photo) | — |

**Specs:** export landscape, 1200×800px minimum (cards display at 3:2).

> Filenames end in `.jpg` to match `data/projects.ts`. If you export `.webp` or
> `.png`, either keep the `.jpg` name (browsers display fine regardless of
> extension) or tell Claude to update the `coverImage` paths.
