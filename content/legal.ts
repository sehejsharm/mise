/**
 * Security and legal pages. Plain language, no invented certifications.
 * TODO(sehej): have counsel review privacy, terms and cookies before launch,
 * and confirm the registered legal entity name, address and hosting region.
 */
import type { PageMeta } from "@/lib/seo";

type LegalPage = { meta: PageMeta; lede: string; body: string };

const updated = "2026-09-29";

export const security: LegalPage = {
  meta: {
    path: "/security",
    title: "Security & Data Handling | Mise",
    description:
      "How Mise handles hotel data: Google Cloud and Firebase infrastructure, role-based access, what is collected and what we do not claim. Book a 15-min demo.",
    h1: "Security and data handling at Mise",
    primaryKeyword: "Mise security",
    eyebrow: "Security",
    updated,
    priority: 0.5,
  },
  lede: "A plain statement of how Mise handles the data your hotel puts into it, where it runs, who can see what, and what we do not claim.",
  body: `
## Where Mise runs

Mise runs on **Google Cloud and Firebase**. Staff, managers and standards owners use Mise in a standard web browser; there is no software to install on your property network and no integration with your PMS.

Google Cloud encrypts customer content at rest by default and documents how in its [default encryption at rest](https://docs.cloud.google.com/docs/security/encryption/default-encryption) guide. Traffic between browsers and Mise is served over HTTPS.

<!-- TODO(sehej): confirm the Google Cloud / Firebase region(s) used for production data and state them here. -->

## What data Mise holds

Mise holds the data needed to run and evidence your standards:

- **People:** names, roles and the property each person works at.
- **Standards:** the SOPs your standards owners write, with versions, reference photos and evidence requirements.
- **Execution records:** task assignments, step completions, timestamps, durations against target, supervisor sign-offs and comments.
- **Evidence:** photos captured inside tasks at gated steps.
- **Acknowledgements:** who confirmed which version of a standard, with a timestamp, device label and record ID.

Mise does not need guest data, payment data or PMS access to work.

## Who can see what

Mise has three role interfaces, and access follows the role:

- **Staff** see their own tasks, the standards assigned to them and their own service record.
- **Managers** see their property's live picture, team readiness, acknowledgements and results.
- **Standards owners** write, publish and improve standards, and read feedback on them.

<!-- TODO(sehej): confirm the production access-control model (per-property scoping, admin roles) matches this description. -->

## Your data belongs to you

The service record is your property's record. During and after a pilot you can export it; filtered acknowledgement records already export as CSV. If you end your use of Mise, tell us and we will agree how your data is returned and deleted.

## What we do not claim

Mise does not currently hold SOC 2, ISO 27001 or any other security or compliance certification, and we do not claim that Mise makes your property compliant with any regulation. When that changes, this page will say so, with evidence.

## Data protection law

Our policies are written with India's Digital Personal Data Protection Act, 2023 in mind and, where they apply, the UK and EU GDPR. The [privacy policy](/privacy) explains how we handle personal data on this website and in the platform.

## Reporting a security issue

If you believe you have found a security issue in Mise or on this website, please email us with the details. We will acknowledge your report and keep you informed while we investigate. Please do not access other people's data or disrupt the service while testing.
`,
};

export const privacy: LegalPage = {
  meta: {
    path: "/privacy",
    title: "Privacy Policy | Mise",
    description:
      "How Mise collects, uses and protects personal data on misehotel.com and in the Mise platform, and the rights you have over it. Questions? Book a demo or email us.",
    h1: "Privacy policy",
    primaryKeyword: "Mise privacy policy",
    eyebrow: "Legal",
    updated,
    priority: 0.3,
  },
  lede: "This policy explains what personal data Mise collects on misehotel.com and in the Mise platform, why, and the choices you have.",
  body: `
## Who we are

Mise is a service execution platform for hotels, built and operated by Focus Realm ("Mise", "we", "us"). <!-- TODO(sehej): insert the registered legal entity name and address. --> For any privacy question, contact us at the email address shown in the site footer.

## Data we collect on this website

- **Forms.** When you book a demo, contact us or subscribe, we collect what you enter: typically your name, work email, organisation, role, number of properties, optional phone number and message.
- **Analytics, only with consent.** If you accept analytics cookies, we use Google Analytics 4 to understand which pages are read and which links are used. Until you accept, Google Analytics does not measure your visit. See the [cookie policy](/cookies).
- **Technical data.** Our hosting provider processes standard request data such as IP address and browser type to deliver the site and protect it from abuse, including rate limiting of form submissions.

## Data processed in the Mise platform

When a hotel uses Mise, we process personal data on the hotel's behalf: staff names and roles, task and execution records, photos captured as evidence, supervisor sign-offs and acknowledgements. The hotel decides what is collected and why; we process it to provide the service. Details are set out in each customer agreement. See [security and data handling](/security).

## How we use your data

- To respond to demo requests and messages, and to arrange and run pilots.
- To send the newsletter you subscribed to (you can unsubscribe at any time).
- To improve the website, using analytics data only where you consented.
- To keep the site and platform secure.

We do not sell personal data, and we do not use website form data for advertising.

## Service providers

We use a small number of providers to run the website and platform: hosting (Vercel for this website), Google Cloud and Firebase for the platform, Resend to deliver form submissions to our inbox, and Google Analytics where you consent. Each processes data only to provide its service to us.

## How long we keep data

We keep enquiry and demo data for as long as needed to follow up and for a reasonable period afterwards, then delete it. Platform data is retained according to the customer agreement with each hotel.

## Your rights

Depending on where you are, including under India's Digital Personal Data Protection Act, 2023 and, where applicable, the UK and EU GDPR, you may have the right to access, correct or erase your personal data, to withdraw consent, and to raise a grievance. Email us and we will respond. You can change your cookie choices at any time from "Cookie preferences" in the footer.

## Changes

We will update this page if our practices change and show the date of the latest version below the title.
`,
};

export const terms: LegalPage = {
  meta: {
    path: "/terms",
    title: "Terms of Use | Mise",
    description:
      "The terms that apply to using misehotel.com, including content, acceptable use and liability. Platform pilots are covered by separate customer agreements.",
    h1: "Terms of use",
    primaryKeyword: "Mise terms of use",
    eyebrow: "Legal",
    updated,
    priority: 0.3,
  },
  lede: "These terms apply to your use of misehotel.com. Use of the Mise platform in a pilot or subscription is governed by a separate customer agreement.",
  body: `
## About these terms

misehotel.com is operated by Focus Realm, the company behind Mise. <!-- TODO(sehej): insert registered legal entity name and address; confirm governing law and courts. --> By using this website you agree to these terms.

## Content on this site

We write the content on this site to be accurate and useful, but it is general information about Mise and hotel operations, not professional, legal or compliance advice. Figures shown for the Aurora Grand Colombo property are demo data from a fictional property. ROI calculations are estimates based on assumptions you enter and are not a promise of results.

## Intellectual property

The Mise name, logo, text, graphics and screenshots on this site belong to Focus Realm or its licensors. You may share links to our pages and quote short passages with attribution. The media kit on the About page may be used to write about Mise.

## Acceptable use

Please do not attempt to disrupt the site, access it by automated means that place an unreasonable load on it, probe it for vulnerabilities without following the reporting process on our [security page](/security), or submit forms with false or harmful content.

## Third-party links

This site links to other websites, including sources we cite. We are not responsible for their content or practices.

## Pilots and subscriptions

Demos and pilots are arranged individually. The terms of any pilot or subscription, including data processing, service levels and fees, are set out in a separate agreement between your organisation and us.

## Liability

To the extent permitted by law, we are not liable for losses arising from your use of this website or reliance on its general content. Nothing in these terms limits liability that cannot be limited by law.

## Changes

We may update these terms. The date of the latest version is shown below the title.
`,
};

export const cookies: LegalPage = {
  meta: {
    path: "/cookies",
    title: "Cookie Policy | Mise",
    description:
      "Which cookies misehotel.com uses, why, and how to accept, reject or change them. Analytics runs only after you accept. Change your choice any time in the footer.",
    h1: "Cookie policy",
    primaryKeyword: "Mise cookie policy",
    eyebrow: "Legal",
    updated,
    priority: 0.3,
  },
  lede: "This site uses as few cookies as possible, and nothing that measures you until you say yes.",
  body: `
## How consent works here

When you first visit, a small banner offers **Accept**, **Reject** and **Preferences**. We use Google Consent Mode v2 with every setting defaulted to *denied*. Google Analytics does not measure your visit until you accept analytics. You can change your choice at any time from **Cookie preferences** in the footer.

## Cookies and storage we use

| Name | Purpose | Type | Lasts |
|---|---|---|---|
| mise_consent | Remembers your cookie choice | Strictly necessary, first party | 6 months |
| mise-theme (local storage) | Remembers light or dark theme | Preference, first party | Until cleared |
| _ga, _ga_* | Google Analytics 4: distinguishes visits and sessions | Analytics, set only after you accept | Up to 2 years |

We do not use advertising cookies. The "Advertising" option in Preferences stays off unless you switch it on, and we do not currently run advertising tags.

## Third-party embeds

If a booking scheduler is embedded on the demo page, the scheduling provider may set its own cookies when it loads. It loads only when you scroll to it.

## Managing cookies in your browser

You can also block or delete cookies in your browser settings. Blocking strictly necessary storage means the site cannot remember your consent choice, so the banner will reappear.
`,
};
