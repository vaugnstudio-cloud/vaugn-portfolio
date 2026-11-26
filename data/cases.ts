// The five selected cases, rewritten November 2026 from the confirmed facts
// register (hub: 02-PORTFOLIO/CLAIMS-AND-CASE-STUDIES-2026-11-02.md and the
// 4 November brief). Rules for this file:
//   · credit every relationship exactly: agency work through Your SocialChef,
//     or direct client
//   · only supported claims: no metrics, results, counts or dates that are
//     not on record
//   · no dash punctuation in public copy, simple English
import type { Project } from "@/data/projects";

const YSC = "Agency work through Your SocialChef";

export const selectedCases: Project[] = [
  // ── 01 · Augello's ─────────────────────────────────────────
  {
    id: "augellos",
    type: "case-study",
    provenance: "Agency work",
    credit: `${YSC}. Existing restaurant brand.`,
    title: "Augello's",
    client: "Italian restaurant and pizzeria, Balwyn, Melbourne",
    year: "2026",
    category: ["CAMPAIGN", "SOCIAL", "GOOGLE ADS", "WEBPAGE DESIGN"],
    headline: "Campaign graphics and a webpage design for an Italian restaurant, made within its existing brand.",
    description:
      "I designed campaign materials for Augello's using the restaurant's existing brand. My work includes the pinned post series, Google ad graphics and the design of the What's On webpage.",
    deliverables: [
      "Pinned post series",
      "Signature dish posters",
      "Google ad graphics in three ratios",
      "What's On webpage design",
    ],
    coverImage: "/images/augellos/cover.jpg",
    featured: true,
    showcase: {
      order: 1,
      index: "Campaign graphics and webpage design",
      what: "Campaign graphics and a webpage design, made within the restaurant's existing brand.",
      part: "I designed the pinned post series, the Google ad graphics and the What's On page. Another person built the page.",
      formats: "Social posts, Google ads in three ratios, desktop and mobile webpage",
      images: [
        { src: "/images/augellos/pinned-2.jpg", label: "Pinned post: Hot Smoked Salmon Pizza", aspect: "tall", span: 3 },
        { src: "/images/augellos/pinned-5.jpg", label: "Pinned post: Sticky Date Pudding", aspect: "tall", span: 3 },
        { src: "/images/augellos/web-devices.jpg", label: "What's On page design: weekly specials on desktop and mobile", aspect: "wide", span: 6 },
      ],
    },
    caseStudy: {
      problem:
        "Augello's needed graphics that felt like the same restaurant on Instagram, in Google ads and on its new website. Everything had to use the restaurant's existing brand and its own photography.",
      role: [
        "Designed the pinned post series and the signature dish posters",
        "Designed the Google ad graphics in landscape, square and portrait",
        "Designed the What's On webpage for desktop and mobile. Another person built it.",
        "Worked within the restaurant's existing type, colour and logo",
      ],
      strategy:
        "Each pinned post does one job: it shows the room, the people or one signature dish. The same stone surface, light and type run through the series, so the profile reads as one place.",
      designSystem: {
        body: "The pinned post series is the first thing a new visitor sees on the profile.",
        images: [
          { src: "/images/augellos/pinned-strip.jpg", label: "The pinned post series", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Signature dishes",
          body: "One dish per poster. The dish name sits in the brand's display type with one red word, a short line underneath, and the plate does the rest. Each poster was delivered at 4:5 with a layered PSD and live text, so the agency can change a dish or a line quickly.",
          images: [
            { src: "/images/augellos/pinned-2.jpg", label: "Hot Smoked Salmon Pizza", aspect: "tall" },
            { src: "/images/augellos/pinned-3.jpg", label: "Sand Crab Lasagne", aspect: "tall" },
            { src: "/images/augellos/pinned-4.jpg", label: "Spaghetti Marinara", aspect: "tall" },
            { src: "/images/augellos/pinned-5.jpg", label: "Sticky Date Pudding", aspect: "tall" },
          ],
        },
        {
          heading: "Google ad graphics",
          body: "Each headline was set in landscape, square and portrait.",
          note: "Every ratio was cropped from the full size photos instead of being resized from another ratio, and each crop was placed around where the dish actually sits.",
          images: [
            { src: "/images/augellos/pmax-matrix.jpg", label: "Two of the headlines, shown in all three ratios", aspect: "wide" },
          ],
        },
        {
          heading: "The What's On page",
          body: "I designed the page within the approved site design: a hero, the weekly specials as cards, a ticketed lunch event and special nights as photo tiles. On mobile the specials become a swipe row, and a sticky bar keeps Book and Order in reach. Another person built the page.",
          images: [
            { src: "/images/augellos/web-hero.jpg", label: "Desktop: page hero", aspect: "wide" },
            { src: "/images/augellos/web-devices.jpg", label: "Weekly specials on desktop and mobile", aspect: "wide" },
            { src: "/images/augellos/web-nights.jpg", label: "Desktop: special nights", aspect: "wide" },
          ],
        },
      ],
      outcome: {
        body: "Delivered in August and September 2026 with editable source files. The photography is the venue's own. A few frames were extended with AI tools and finished in Photoshop.",
      },
    },
  },

  // ── 02 · MedSync ───────────────────────────────────────────
  {
    id: "medsync",
    type: "case-study",
    provenance: "Client work",
    credit: "Direct client. The client supplied the logo.",
    title: "MedSync",
    client: "Psychiatry clinic, California, US",
    year: "2025",
    category: ["HEALTHCARE", "WEB DESIGN", "COPYWRITING", "FRAMER"],
    headline: "A psychiatry clinic website, designed, written and built in Framer.",
    description:
      "I created MedSync's website from scratch: the visual design, the written content and the Framer build. The client supplied the logo. I developed the supporting typography and colour palette and used them across the site.",
    deliverables: [
      "Website design",
      "Website copy",
      "Framer build",
      "Typography and colour palette",
    ],
    coverImage: "/images/medsync-cover.jpg",
    featured: true,
    url: "https://medsyncmentalhealth.com/",
    showcase: {
      order: 2,
      index: "Website design, copy and Framer build",
      what: "A psychiatry clinic website, designed, written and built in Framer.",
      part: "I designed the site, wrote the copy, set the typography and colour palette and built it in Framer. The client supplied the logo.",
      formats: "Responsive website, desktop and mobile",
      images: [
        { src: "/images/live/medsync-d-services.jpg", label: "Live site, desktop: core services", aspect: "wide", span: 4 },
        { src: "/images/live/medsync-m-services.jpg", label: "Live site, mobile: core services", aspect: "phone", span: 2 },
      ],
    },
    caseStudy: {
      problem:
        "MedSync, a psychiatry clinic in California, needed a website that explains its services clearly and makes it easy to call or request an appointment, for in person and telehealth visits.",
      role: [
        "Visual design for the whole site",
        "Supporting typography and colour palette, built around the client's logo",
        "Website copy, refined through the client's feedback on text and images",
        "Framer build and responsive layout",
      ],
      strategy:
        "Calm colours, plenty of space and a clear order: what the clinic treats, who it helps and how to book. The phone number and the appointment button stay in reach on desktop and mobile.",
      designSystem: {
        body: "A soft teal on warm off white, a classic serif for headings and a clean sans serif for reading. It stays away from cold hospital blue.",
        images: [
          { src: "/images/live/medsync-d-hero.jpg", label: "Live site, desktop: first screen", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Services, on desktop and mobile",
          body: "Each service has a short plain description and a photo, in the same card on every screen size. On mobile the cards stack in one column and the menu folds away.",
          images: [
            { src: "/images/live/medsync-d-services.jpg", label: "Desktop: core services", aspect: "wide" },
            { src: "/images/live/medsync-m-hero.jpg", label: "Mobile: first screen", aspect: "phone" },
            { src: "/images/live/medsync-m-services.jpg", label: "Mobile: core services", aspect: "phone" },
          ],
        },
      ],
      outcome: {
        body: "The site is live. These are captures of it as it runs today.",
        liveUrl: "https://medsyncmentalhealth.com/",
      },
    },
  },

  // ── 03 · The Hill ──────────────────────────────────────────
  {
    id: "the-hill",
    type: "case-study",
    provenance: "Agency work",
    credit: YSC,
    title: "The Hill",
    client: "Hospitality venue",
    year: "2026",
    category: ["CAMPAIGN", "SOCIAL", "GOOGLE", "MOTION"],
    headline: "Two lunch campaigns across posters, Google graphics and animated stories.",
    description:
      "I created campaign materials for The Hill's Seniors Lunch and Lunch at The Hill promotions. The work brings together poster layouts, Google graphics and vertical animated stories.",
    deliverables: [
      "Vertical posters",
      "Google graphics",
      "Story layouts",
      "Animated stories",
    ],
    coverImage: "/images/the-hill/cover.jpg",
    featured: true,
    showcase: {
      order: 3,
      index: "Campaign graphics and animated stories",
      what: "Two lunch campaigns across posters, Google graphics and animated stories.",
      part: "I designed the posters, Google graphics and story layouts for both campaigns, and prepared the animated stories.",
      formats: "4:5 posters, 4:3 Google graphics, 9:16 animated stories",
      images: [
        { src: "/images/the-hill/sl-poster-1.jpg", label: "Seniors Lunch: vertical poster", aspect: "tall", span: 3 },
        { src: "/images/the-hill/lh-poster-2.jpg", label: "Lunch at The Hill: vertical poster", aspect: "tall", span: 3 },
        { src: "/images/the-hill/sl-google.jpg", label: "Seniors Lunch: Google graphic", aspect: "landscape", span: 3 },
        { src: "/images/the-hill/lh-google.jpg", label: "Lunch at The Hill: Google graphic", aspect: "landscape", span: 3 },
      ],
    },
    caseStudy: {
      problem:
        "I prepared designs for two lunch campaigns at The Hill: Seniors Lunch, Monday to Friday, and Lunch at The Hill. Each campaign needed posters, a Google graphic and vertical stories that work as one set.",
      role: [
        "Seniors Lunch: worked across the poster, Google and story formats",
        "Seniors Lunch: refined the title treatment so it matches across the campaign",
        "Lunch at The Hill: prepared coordinated posters, story layouts and animated stories",
      ],
      strategy:
        "One title lockup per campaign, used at the same weight on every format, so each campaign reads at a glance. The photo does the selling: the room and the people for Seniors Lunch, the plate for Lunch at The Hill.",
      execution: [
        {
          heading: "Seniors Lunch",
          body: "Three vertical posters and a Google graphic. The photos show the dining room, the table and the guests, and the title sits on a deep blue base.",
          note: "I refined the title treatment so every piece in the set uses the same size and style. A campaign reads as one when the title never changes.",
          images: [
            { src: "/images/the-hill/sl-poster-1.jpg", label: "Seniors Lunch: vertical poster, the dining room", aspect: "tall" },
            { src: "/images/the-hill/sl-poster-2.jpg", label: "Seniors Lunch: vertical poster, the table", aspect: "tall" },
            { src: "/images/the-hill/sl-poster-3.jpg", label: "Seniors Lunch: vertical poster, the guests", aspect: "tall" },
            { src: "/images/the-hill/sl-google.jpg", label: "Seniors Lunch: Google graphic", aspect: "landscape" },
          ],
          videos: [
            { src: "/videos/the-hill/sl-story-1.mp4", poster: "/images/the-hill/sl-story-1-poster.jpg", label: "Seniors Lunch: animated story, the dining room" },
            { src: "/videos/the-hill/sl-story-2.mp4", poster: "/images/the-hill/sl-story-2-poster.jpg", label: "Seniors Lunch: animated story, the wine pour" },
            { src: "/videos/the-hill/sl-story-3.mp4", poster: "/images/the-hill/sl-story-3-poster.jpg", label: "Seniors Lunch: animated story, the long table" },
          ],
        },
        {
          heading: "Lunch at The Hill",
          body: "Coordinated posters, a Google graphic and three animated stories. The plate leads, and the headline sits beside a thin gold rule in the lower left of every format.",
          note: "The stories keep the poster's type and position, so a guest who saw the poster recognises the story straight away.",
          images: [
            { src: "/images/the-hill/lh-poster-1.jpg", label: "Lunch at The Hill: vertical poster", aspect: "tall" },
            { src: "/images/the-hill/lh-poster-2.jpg", label: "Lunch at The Hill: vertical poster, teal wall", aspect: "tall" },
            { src: "/images/the-hill/lh-poster-3.jpg", label: "Lunch at The Hill: vertical poster, served", aspect: "tall" },
            { src: "/images/the-hill/lh-google.jpg", label: "Lunch at The Hill: Google graphic", aspect: "landscape" },
          ],
          videos: [
            { src: "/videos/the-hill/lh-story-1.mp4", poster: "/images/the-hill/lh-story-1-poster.jpg", label: "Lunch at The Hill: animated story, served to the table" },
            { src: "/videos/the-hill/lh-story-2.mp4", poster: "/images/the-hill/lh-story-2-poster.jpg", label: "Lunch at The Hill: animated story, teal wall" },
            { src: "/videos/the-hill/lh-story-3.mp4", poster: "/images/the-hill/lh-story-3-poster.jpg", label: "Lunch at The Hill: animated story, the timber table" },
          ],
        },
      ],
      outcome: {
        body: "The stories play here without sound. Their music is licensed for the client's own channels.",
      },
    },
  },

  // ── 04 · Tacos 'N' Tequilas ────────────────────────────────
  {
    id: "tacos-n-tequilas",
    type: "case-study",
    provenance: "Agency work",
    credit: `${YSC}. Existing visual identity.`,
    title: "Tacos 'N' Tequilas",
    client: "Mexican kitchen and bar, Melbourne",
    year: "2026",
    category: ["BRAND GUIDE", "CAMPAIGN", "SOCIAL"],
    headline: "A brand guide and campaign layouts, made within an existing identity.",
    description:
      "I created the brand guide and campaign layouts for Tacos 'N' Tequilas using its existing visual identity. My work covered both writing down the brand's rules and putting them to work in campaign graphics.",
    deliverables: [
      "One page brand guide",
      "Nine tile Instagram grid",
      "Campaign in three variations and three formats",
      "Follower campaign",
    ],
    coverImage: "/images/tnt/cover.jpg",
    featured: true,
    showcase: {
      order: 4,
      index: "Brand guide and campaign layouts",
      what: "A brand guide and campaign layouts, made within an existing identity.",
      part: "I created the one page brand guide and the campaign layouts. The identity already existed.",
      formats: "Brand guide, 4:5 and 1:1 posts, Google post",
      images: [
        { src: "/images/tnt/guide-headline-price.jpg", label: "Brand guide: headline and price treatment", aspect: "wide", span: 6 },
        { src: "/images/tnt/v1-craving-4x5.jpg", label: "Campaign: the craving, 4:5", aspect: "tall", span: 3 },
        { src: "/images/tnt/v2-company-4x5.jpg", label: "Campaign: the company, 4:5", aspect: "tall", span: 3 },
      ],
    },
    caseStudy: {
      problem:
        "The venue's brand PDF and the agency brief disagreed on typeface and colour, and new campaign work had to sit beside posters other designers had already made. The offer itself was simple: Sunday Birria Night at one venue.",
      role: [
        "One page brand guide: logo use, colour, type, headline and price treatment, crop rules and motion notes",
        "Nine tile Instagram grid",
        "Sunday Birria Night campaign in three variations and three formats",
        "Follower campaign posters and a Google post",
        "Hand back notes for the creative lead, with every open question listed first",
      ],
      strategy:
        "Write the rules down first, then design. The guide settled the logo, colours, two typefaces and the headline and price treatment, so every later piece could be checked against one page.",
      designSystem: {
        body: "The guide keeps the client's four core colours and marks three support neutrals as extended. It carries the headline treatment from the approved posters onto the licensed typefaces, and it sets the crop rules: a 1:1 is a centre crop of the 4:5, and a 9:16 keeps type out of the top and bottom safe zones.",
        images: [
          { src: "/images/tnt/guide-headline-price.jpg", label: "Guide: headline and price treatment, carried from the approved set", aspect: "wide" },
          { src: "/images/tnt/guide-colour-type.jpg", label: "Guide: colour and type, core and extended", aspect: "wide" },
        ],
      },
      execution: [
        {
          heading: "Three reasons to come",
          body: "Each variation leads with a different real photo: the food, two guests, the bar after dark. The type does one job each time: the offer, the day, the venue and the next step.",
          note: "Every 4:5 was composed with its key content inside the shared safe zone, so the 1:1 versions are straight centre crops.",
          images: [
            { src: "/images/tnt/v1-craving-4x5.jpg", label: "The craving, 4:5", aspect: "tall" },
            { src: "/images/tnt/v2-company-4x5.jpg", label: "The company, 4:5", aspect: "tall" },
            { src: "/images/tnt/v1-craving-1x1.jpg", label: "The craving, 1:1 centre crop", aspect: "square" },
            { src: "/images/tnt/v3-room-1x1.jpg", label: "The room, 1:1", aspect: "square" },
          ],
        },
        {
          heading: "Nine tiles that read as a place",
          body: "The grid alternates full frame photos with campaign tiles, so the profile feels like a room rather than a stream of ads.",
          images: [
            { src: "/images/tnt/grid-wide.jpg", label: "The nine tile grid, shown in place", aspect: "wide" },
          ],
        },
        {
          heading: "After the launch",
          body: "The guide kept working. A follower campaign sets the brand's cream panel against the venue's photos, with one hero word in chilli red: three posters and a Google post.",
          images: [
            { src: "/images/tnt/follower-1.jpg", label: "Follower campaign: Modern Mexican, made by hand", aspect: "tall" },
            { src: "/images/tnt/follower-2.jpg", label: "Follower campaign: the margarita", aspect: "tall" },
            { src: "/images/tnt/follower-3.jpg", label: "Follower campaign: tacos worth the trip", aspect: "tall" },
            { src: "/images/tnt/follower-google.jpg", label: "Follower campaign: Google post", aspect: "tall" },
          ],
        },
      ],
      outcome: {
        body: "Delivered to Your SocialChef in September 2026 with layered PSD files and export sets. Every image is a frame from the venue's own shoot.",
      },
    },
  },

  // ── 05 · Your SocialChef ───────────────────────────────────
  {
    id: "your-socialchef",
    type: "case-study",
    provenance: "Agency work",
    credit: "Employer. Senior Graphic Designer since September 2026.",
    title: "Your SocialChef",
    client: "Marketing agency, Australia",
    year: "2023 to now",
    category: ["AGENCY", "CAMPAIGNS", "CREATIVE REVIEW"],
    headline: "Design production and creative review at an Australian agency.",
    description:
      "Alongside my own design work at Your SocialChef, I review creative work, give feedback and make corrections when needed. My reviews cover text and offer details, spacing, readability, cropping, safe zones and brand consistency.",
    deliverables: [
      "Campaign and social graphics",
      "Creative review",
      "Safe zone templates",
      "Figma web mockups",
    ],
    coverImage: "/images/ysc-cover.jpg",
    featured: true,
    url: "https://yoursocialchef.com/",
    showcase: {
      order: 5,
      index: "Design production and creative review",
      what: "Design production and creative review across client accounts.",
      part: "I design for client brands, and I review creative work across the team, giving notes or making the corrections myself.",
      formats: "Posters, stories, carousels, menus, email headers",
      images: [
        { src: "/images/cnc/vertical-poster.jpg", label: "Coffee N Chaos: free coffee week", aspect: "tall", span: 2 },
        { src: "/images/recent/kumars-navratri.jpg", label: "Kumar's Indian Kitchen and Sweets: Navratri", aspect: "tall", span: 2 },
        { src: "/images/recent/renzos-cocktail.jpg", label: "Renzo's Bar: cocktail hour", aspect: "tall", span: 2 },
        { src: "/images/recent/qa-toolkit.jpg", label: "Safe zone templates and the checks I review against", aspect: "wide", span: 6 },
      ],
    },
    caseStudy: {
      problem:
        "Client accounts at an agency each need work that looks like it came from their own designer, on a weekly calendar. Since my promotion, part of my job is also to check the team's work before it reaches a client.",
      role: [
        "Senior Graphic Designer since September 2026",
        "Brand & Web Designer, February 2023 to September 2026",
        "Campaign graphics, social templates, Figma web mockups and short video for client accounts",
        "Creative review: text and offers, layout, readability, cropping, safe zones and brand consistency",
        "Worked across 20+ client accounts over several years",
      ],
      execution: [
        {
          heading: "Coffee N Chaos: free coffee week",
          body: "A whole week of free coffee at Coffee N Chaos, a new café in Beveridge. One campaign across a feed poster, three stories and a reel, set in the café's own type and cup colours. When the dates were confirmed, I updated every piece and rebuilt the reel in After Effects with live text, so the copy stays easy to change.",
          images: [
            { src: "/images/cnc/vertical-poster.jpg", label: "Coffee N Chaos: feed poster, a whole week of free coffee", aspect: "tall" },
            { src: "/images/cnc/story-1.jpg", label: "Coffee N Chaos: story, the week announced", aspect: "story" },
            { src: "/images/cnc/story-3.jpg", label: "Coffee N Chaos: story, free coffee week starts today", aspect: "story" },
            { src: "/images/cnc/story-2.jpg", label: "Coffee N Chaos: story, last day of free coffee", aspect: "story" },
          ],
          videos: [
            { src: "/videos/cnc/reel.mp4", poster: "/images/cnc/reel-poster.jpg", label: "Coffee N Chaos: reel, the cups and the dates" },
          ],
        },
        {
          heading: "Recent client work",
          body: "A slice of September and October 2026, each piece set in that client's own type and colour. Most use the client's own photography. Where a shoot did not cover a shot, the image was extended or restaged with AI tools and art directed by me.",
          images: [
            { src: "/images/recent/kumars-afl.jpg", label: "Kumar's Sweets: AFL game day", aspect: "tall" },
            { src: "/images/recent/kumars-navratri.jpg", label: "Kumar's Indian Kitchen and Sweets: Navratri", aspect: "tall" },
            { src: "/images/recent/renzos-pasta.jpg", label: "Renzo's Bar: build your pasta carousel", aspect: "tall" },
            { src: "/images/recent/renzos-cocktail.jpg", label: "Renzo's Bar: cocktail hour", aspect: "tall" },
            { src: "/images/recent/sincero-christmas.jpg", label: "Sincero: Christmas tables", aspect: "tall" },
            { src: "/images/recent/sp-fathers-day.jpg", label: "SP: Father's Day bookings", aspect: "tall" },
            { src: "/images/recent/gcco-a3-qr.jpg", label: "General Chicken Co.: A3 order by QR print poster", aspect: "tall" },
            { src: "/images/recent/gcco-burger.jpg", label: "General Chicken Co.: triple cheeseburger", aspect: "tall" },
            { src: "/images/recent/kumars-dussehra.jpg", label: "Kumar's Sweets: Dussehra", aspect: "tall" },
            { src: "/images/recent/kumars-thali.jpg", label: "Kumar's Indian Kitchen and Sweets: thali lunch", aspect: "tall" },
            { src: "/images/recent/junk-melbourne-cup-1.jpg", label: "JUNK: Melbourne Cup catering", aspect: "tall" },
            { src: "/images/recent/victorias-melbourne-cup.jpg", label: "Victoria's Pizza 'N' Beyond: Melbourne Cup", aspect: "tall" },
            { src: "/images/recent/gcco-halloween.jpg", label: "General Chicken Co.: Halloween", aspect: "tall" },
            { src: "/images/recent/lilianas-christmas.jpg", label: "Liliana's Trattoria: Christmas parties", aspect: "tall" },
          ],
        },
        {
          heading: "Creative review for the team",
          body: "Depending on the task, I give correction notes or make the changes myself. I check text and offer details against the brief, spacing, readability, cropping, safe zones and brand consistency. I use ChatGPT to support this structured review.",
          note: "My own work goes through the same checks. On The Hill's Seniors Lunch, I refined the title treatment so every piece in the set matched.",
          images: [
            { src: "/images/recent/qa-toolkit.jpg", label: "Safe zone templates for each format, and the checks I review against", aspect: "wide" },
          ],
        },
        {
          heading: "Earlier work across the roster",
          body: "Different voices, one standard: pizza groups, Italian restaurants, a café, a tea brand and agency workshops.",
          images: [
            { src: "/images/ysc/augellos-valentines.jpg", label: "Augello's: Valentine's Day", aspect: "tall" },
            { src: "/images/ysc/cn-benedict.jpg", label: "Caffè Notte: breakfast menu", aspect: "tall" },
            { src: "/images/ysc/gabbys-early-bird.jpg", label: "Gabby's Pizza: Early Bird", aspect: "square" },
            { src: "/images/ysc/gabbys-summer-frenzy.jpg", label: "Gabby's Pizza: Summer Frenzy, same campaign system", aspect: "square" },
          ],
        },
      ],
    },
  },
];
