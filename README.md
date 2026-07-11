# FavoHomes

A static website for FavoHomes (favohomes.com), an independent California brokerage for residential, commercial, and business sales.

## Pages

- `index.html` - Home (hero, sales-record ticker, search, featured listings, services, testimonials)
- `listings.html` - Residential and commercial listings with client-side filtering
- `about.html` - About the brokerage and the broker
- `contact.html` - Contact form, office info, and map

## Structure

```
.
├── index.html
├── listings.html
├── about.html
├── contact.html
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Development

This is a plain HTML/CSS/JS static site with no build step. To preview locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Deployed as a static site on Vercel. Any push to the `main` branch triggers a new deploy.
