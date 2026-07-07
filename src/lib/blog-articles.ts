export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: { heading?: string; paragraphs: string[] }[];
};

export const CATEGORIES = [
  "All",
  "Lead Response",
  "Automation",
  "CRM",
  "Estimates",
  "Marketing",
  "Operations",
];

export const ARTICLES: BlogArticle[] = [
  {
    slug: "why-contractors-lose-leads-after-the-first-inquiry",
    title: "Why Contractors Lose Leads After the First Inquiry",
    category: "Lead Response",
    excerpt:
      "Most lost jobs are decided in the first hour. Here is where the drop-off happens and how to close the gap.",
    date: "March 4, 2026",
    readTime: "6 min read",
    featured: true,
    content: [
      {
        paragraphs: [
          "For most renovation businesses, the lead itself is not the problem. The problem is what happens in the first fifteen minutes after the form is submitted, the call is missed, or the DM lands in an inbox nobody is watching.",
          "A homeowner who fills out a form on a Tuesday night is usually contacting three or four contractors in the same sitting. By the time the second one replies, the first has already anchored the conversation, booked the appointment, or moved into an estimate.",
        ],
      },
      {
        heading: "Where the drop-off actually happens",
        paragraphs: [
          "Leads are lost across four handoffs: capture, response, qualification, and follow-up. Every handoff that lives in a different tool, a different phone, or a different person is a place the lead can silently disappear.",
          "When capture, inbox, CRM, and follow-up live in the same system, the handoffs collapse. There is one record, one thread, and one owner from inquiry to booked job.",
        ],
      },
      {
        heading: "What to change first",
        paragraphs: [
          "Start with response time. Automate the first reply so it goes out within a minute — even a short, personal acknowledgement dramatically improves conversion. Then make sure every conversation, from any channel, lands in one inbox tied to the lead record. That single change eliminates most of the leaks.",
        ],
      },
    ],
  },
  {
    slug: "missed-call-text-back-for-home-services",
    title: "How Missed Call Text-Back Helps Home Service Businesses Respond Faster",
    category: "Lead Response",
    excerpt:
      "A missed call does not have to mean a lost job. A simple automated text-back keeps the conversation alive.",
    date: "February 22, 2026",
    readTime: "4 min read",
    content: [
      {
        paragraphs: [
          "Contractors miss calls constantly — on the job, on a ladder, driving between sites. The homeowner on the other end rarely leaves a voicemail. They just call the next name on their list.",
          "Missed-call text-back closes the loop automatically. The moment a call is missed, the caller receives a text acknowledging the miss and offering a fast path forward: pick a time, describe the project, or continue by text.",
        ],
      },
      {
        heading: "Why it works",
        paragraphs: [
          "Text keeps the conversation warm without demanding the homeowner call back. It also creates a written record that ties directly into the CRM, so the next available team member can pick it up with full context.",
        ],
      },
    ],
  },
  {
    slug: "what-a-contractor-crm-should-actually-do",
    title: "What a Contractor CRM Should Actually Do Beyond Storing Contacts",
    category: "CRM",
    excerpt:
      "A contact list is not a CRM. Here is the workflow a renovation business actually needs from the tool.",
    date: "February 10, 2026",
    readTime: "7 min read",
    content: [
      {
        paragraphs: [
          "Most contractor CRMs are glorified address books. They store names and phone numbers, and stop there. The result is a system nobody opens except to look someone up.",
          "A CRM built for renovation businesses should move a lead through a defined pipeline, hold every conversation from every channel, generate estimates and proposals, capture signatures, and trigger the follow-up when a stage changes.",
        ],
      },
      {
        heading: "The workflow that matters",
        paragraphs: [
          "New Lead → Qualified → Estimate → Proposal → Booked → In Progress → Complete. Every stage should carry the artifacts that belong to it: the messages, the quote, the site notes, the signed document, the invoice. When a stage changes, the next action fires automatically.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-follow-up-faster",
    title: "How AI Agents Can Help Renovation Businesses Follow Up Faster",
    category: "Automation",
    excerpt:
      "AI agents are not a gimmick. Used correctly, they close the gap between a lead and a booked appointment.",
    date: "January 28, 2026",
    readTime: "5 min read",
    content: [
      {
        paragraphs: [
          "Follow-up is the single most consistent failure point in a renovation sales process. AI agents built specifically for contractor workflows can qualify a new lead in seconds, draft an estimate from a photo, and nudge a cold opportunity back into the pipeline — without the owner touching a keyboard.",
        ],
      },
      {
        heading: "What to use them for",
        paragraphs: [
          "Speed-to-lead, review requests, appointment reminders, cold-opportunity reactivation, and estimate drafting are the highest-leverage places to start. Each one removes a repetitive task that would otherwise slip through when the crew gets busy.",
        ],
      },
    ],
  },
  {
    slug: "estimate-to-signed-proposal-shorten-cycle",
    title: "From Estimate to Signed Proposal: How to Shorten the Sales Cycle",
    category: "Estimates",
    excerpt:
      "The longer a proposal sits, the more likely it dies. Cut the drift out of your estimate-to-signature flow.",
    date: "January 14, 2026",
    readTime: "6 min read",
    content: [
      {
        paragraphs: [
          "A proposal that takes four days to draft and another week to chase down for signature loses to the contractor who sends a clean, signable document the day after the site visit.",
          "Shortening the cycle is not about writing faster. It is about removing the manual steps between the estimate, the proposal, and the signature.",
        ],
      },
      {
        heading: "The three cuts that matter",
        paragraphs: [
          "First, draft estimates from templates and site notes automatically. Second, turn approved estimates into proposals with a single click. Third, send them for e-signature from inside the same platform so nothing lives in a separate document tool.",
        ],
      },
    ],
  },
  {
    slug: "inbox-crm-calendar-work-together",
    title: "Why Your Inbox, CRM, and Calendar Should Work Together",
    category: "Operations",
    excerpt:
      "Three disconnected tools create three sources of truth. Here is why that costs jobs, and how to fix it.",
    date: "January 3, 2026",
    readTime: "5 min read",
    content: [
      {
        paragraphs: [
          "When the inbox lives on a phone, the CRM lives on a laptop, and the calendar lives in a booking tool, nobody has the full picture. Messages arrive with no lead context. Appointments get booked with no linked conversation. Follow-up depends on the owner remembering.",
        ],
      },
      {
        heading: "One record, three views",
        paragraphs: [
          "The fix is not more integrations. It is one lead record that surfaces its own conversations and its own bookings, so any team member can pick up any lead with full context in seconds.",
        ],
      },
    ],
  },
  {
    slug: "automated-review-requests-build-trust",
    title: "How Automated Review Requests Help Contractors Build Trust",
    category: "Marketing",
    excerpt:
      "Reviews are the strongest social proof in home services. Automating the ask changes the volume completely.",
    date: "December 19, 2025",
    readTime: "4 min read",
    content: [
      {
        paragraphs: [
          "Manual review requests happen when the owner remembers. Automated review requests happen every time a job is marked complete. The difference is measured in dozens of reviews per year.",
        ],
      },
      {
        heading: "How to do it without feeling pushy",
        paragraphs: [
          "Time the request to the moment the homeowner is happiest — usually 24 to 48 hours after project completion. Keep the message short, personal, and easy to act on. Route negative feedback privately so it can be handled before it becomes a public review.",
        ],
      },
    ],
  },
  {
    slug: "what-contractors-should-track-before-ads",
    title: "What Contractors Should Track Before Spending More on Ads",
    category: "Marketing",
    excerpt:
      "More ad spend on a broken pipeline just wastes more money. Track these numbers first.",
    date: "December 5, 2025",
    readTime: "6 min read",
    content: [
      {
        paragraphs: [
          "Before increasing ad spend, understand what happens to the leads already coming in. Response time, contact rate, appointment rate, close rate, and average job value tell the honest story of the pipeline.",
        ],
      },
      {
        heading: "The five numbers",
        paragraphs: [
          "If the current close rate on inbound leads is under 20 percent, ads will not fix that — they will only expose it. Fix response time and follow-up first, then scale spend against a pipeline that actually converts.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelated(slug: string, limit = 3) {
  const current = getArticle(slug);
  if (!current) return ARTICLES.slice(0, limit);
  return ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category,
  )
    .concat(ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category))
    .slice(0, limit);
}
