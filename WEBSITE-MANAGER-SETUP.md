# H23 Works Website Manager — V2

This version keeps the cinematic H23 design and turns the CMS into a section-based manager.

## CMS sections
- Home
- Services
- Our Work / Portfolio
- About
- Testimonials
- FAQ
- Contact & Socials
- Site Settings / SEO

## Enquiry form
The default mode remains `mailto` so the site works without a paid form subscription. The Contact CMS includes an optional Google Apps Script endpoint. If your Apps Script is ready and tested, select `apps-script`, paste the endpoint, publish, and test one enquiry.

## Authentication
The config uses Netlify Identity + Git Gateway (`git-gateway`) on `main`. The Netlify Identity widget and login redirect are included in `index.html`.

## Safe workflow
1. Test locally with Live Server.
2. Push to the existing `h23works-website` repository.
3. Wait for Netlify to publish.
4. Open `/admin/` and edit one field.
5. Publish and verify the live site.

## Design safety
The CMS is structured rather than a free-form page builder. Editors can add/remove supported content items without changing the cinematic layout.

- Website Maintenance is a separate service. Chat Support and Voice Support remain separate services.
