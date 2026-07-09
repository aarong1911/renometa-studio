export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  content: { heading?: string; paragraphs: string[]; bullets?: string[] }[];
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

const CTA_BLOCK = {
  heading: "Ready to build a smarter system for your business?",
  paragraphs: [
    "RenoMeta Connect helps renovation contractors and home service businesses manage leads, conversations, estimates, scheduling, marketing, and follow-up in one connected platform.",
  ],
};

export const ARTICLES: BlogArticle[] = [
  {
    slug: "how-ai-is-changing-contractor-lead-management",
    title: "How AI Is Changing the Way Contractors Manage Leads",
    category: "Lead Response",
    excerpt:
      "AI is quietly changing how contractors respond to leads, qualify them, and move them into booked jobs. Here is what is actually happening on the ground.",
    date: "May 6, 2026",
    readTime: "8 min read",
    featured: true,
    metaTitle: "How AI Is Changing Contractor Lead Management | RenoMeta",
    metaDescription:
      "Learn how AI helps contractors respond faster, qualify leads, automate follow-up, and turn more inquiries into booked jobs.",
    keywords: [
      "AI for contractors",
      "contractor lead management",
      "construction lead automation",
      "AI agents for contractors",
    ],
    content: [
      {
        paragraphs: [
          "For most renovation and home service businesses, leads are not the real problem. The real problem is what happens in the first hour after a lead comes in. Calls get missed on the job site. Forms sit in an inbox nobody watches until the end of the day. Text messages get buried under crew updates and supplier questions.",
          "AI is starting to change that. Not in a futuristic way, and not by replacing the sales conversation. It is quietly taking on the small, repetitive tasks that used to eat the day: answering fast, asking the right qualifying questions, updating the CRM, and keeping cold leads warm without anyone remembering to follow up.",
        ],
      },
      {
        heading: "Why lead response matters in construction and remodeling",
        paragraphs: [
          "A homeowner planning a kitchen remodel or a roof replacement is rarely calling one contractor. They are usually reaching out to three or four companies in the same evening. The first business to respond with a clear, human message anchors the conversation. The rest are competing to catch up.",
          "Speed to lead is not a marketing metric. It is the single biggest factor in whether an inquiry becomes a booked estimate. And in a business where the owner is often on a job site, that speed is almost impossible to hit manually.",
        ],
      },
      {
        heading: "The problem with manual follow-up",
        paragraphs: [
          "Manual follow-up depends on the owner or office manager remembering. Remembering to reply to the form from Tuesday night. Remembering to text back the missed call from lunchtime. Remembering to nudge the homeowner who asked for a quote two weeks ago and went quiet.",
          "Even in a well-run business, follow-up is the first thing that slips when the calendar fills up. A lead that goes untouched for three days is worth a fraction of a lead answered in three minutes.",
        ],
      },
      {
        heading: "How AI agents support the sales process",
        paragraphs: [
          "AI agents built for contractor workflows are not chatbots. They are small, focused workers that live inside the CRM and inbox. They watch for new leads, respond in a natural voice, ask the qualifying questions that matter (project type, timeline, location, budget range), and hand the conversation off to a human when it is ready to move forward.",
          "Because they read and write into the same system that holds the pipeline, they update the lead record as the conversation happens. There is no separate tool to check and no re-entry.",
        ],
      },
      {
        heading: "Examples of AI in contractor workflows",
        paragraphs: ["A few of the highest-leverage places to start:"],
        bullets: [
          "Instant reply to a new website inquiry, with the first qualifying question already asked.",
          "Missed call text-back that opens a real conversation instead of leaving the caller with a voicemail beep.",
          "Draft estimates generated from site notes and photos, ready for the owner to review and send.",
          "Cold lead reactivation that reaches out to opportunities that went quiet 30, 60, or 90 days ago.",
          "Post-job review requests timed to the moment the homeowner is most likely to say yes.",
        ],
      },
      {
        heading: "Benefits for business owners",
        paragraphs: [
          "The benefit is not that AI does the whole job. It is that the owner stops being the bottleneck for every response, every qualification, and every follow-up nudge. The pipeline keeps moving whether they are on a roof, in a truck, or at dinner.",
          "The second benefit is visibility. Because the AI works inside the CRM, every conversation, qualification, and follow-up is logged automatically. Reporting stops being a guess.",
        ],
      },
      {
        heading: "How RenoMeta Connect brings AI and CRM together",
        paragraphs: [
          "RenoMeta Connect is built around this idea. The inbox, the CRM, the estimates, the scheduling, and the AI agents all live in the same platform. When a new lead comes in, the AI can respond, qualify, update the pipeline, and book the appointment without the information ever leaving the system.",
          "That is the difference between AI as a bolt-on and AI as part of the workflow. One saves a minute here and there. The other rebuilds how leads move through the business.",
        ],
      },
      {
        heading: "Final takeaway",
        paragraphs: [
          "AI is not going to replace the trust and craftsmanship at the center of a renovation business. It is going to remove the friction around it, so the owner and their team spend more time on the work that actually wins jobs.",
        ],
      },
      CTA_BLOCK,
    ],
  },
  {
    slug: "why-remodeling-companies-need-more-than-basic-crm",
    title: "Why Remodeling Companies Need More Than a Basic CRM",
    category: "CRM",
    excerpt:
      "A basic CRM stores contacts. A modern remodeling business needs connected conversations, estimates, follow-up, scheduling, automation, and reporting in one place.",
    date: "April 22, 2026",
    readTime: "9 min read",
    metaTitle: "Why Remodeling Companies Need More Than a Basic CRM | RenoMeta",
    metaDescription:
      "A basic CRM stores contacts. A modern remodeling business needs connected conversations, estimates, follow-up, scheduling, automation, and reporting.",
    keywords: [
      "remodeling CRM",
      "contractor CRM",
      "CRM for remodelers",
      "construction CRM software",
      "home service CRM",
    ],
    content: [
      {
        paragraphs: [
          "Most remodeling companies eventually buy a CRM. Then, six months later, most of them stop using it. The reason is almost always the same: the CRM stores contacts, but the actual work of running a remodeling business lives somewhere else.",
          "Conversations happen in text messages, on the phone, and in Instagram DMs. Estimates get built in a spreadsheet or a separate tool. Site notes live in a notebook in the truck. Scheduling happens in a calendar the office manager owns. The CRM becomes a museum of old contacts nobody opens.",
        ],
      },
      {
        heading: "What a basic CRM does",
        paragraphs: [
          "A basic CRM does three things: it stores contacts, it lets you tag them, and it moves them through a pipeline of stages. That is useful, but it is a small piece of what a remodeling business actually needs.",
          "If the CRM is not where the conversation happens, it will never be up to date. Someone has to remember to copy in the last text message, log the phone call, and update the stage. In a busy week, that never happens.",
        ],
      },
      {
        heading: "Why remodelers need more than contact storage",
        paragraphs: [
          "A remodeling job is not a one-touch sale. It is a long conversation that can stretch across weeks or months, with a site visit, an estimate, a revised estimate, a signed proposal, permits, scheduling, updates, and a final walkthrough.",
          "Every one of those steps has messages, documents, decisions, and follow-ups attached to it. If they live in different tools, the CRM cannot tell the truth about where the lead actually is.",
        ],
      },
      {
        heading: "The importance of connected communication",
        paragraphs: [
          "The single most important upgrade over a basic CRM is a shared inbox tied to the lead record. Text, email, phone, web form, and social messages all land in one place, attached to the homeowner.",
          "Any team member can pick up any conversation with full context. There is no more asking, \"Did anyone reply to the Johnsons?\" — the thread is right there on the record.",
        ],
      },
      {
        heading: "Estimates, proposals, and scheduling in the same system",
        paragraphs: [
          "The other upgrade is bringing estimates, proposals, and scheduling into the same system. When an approved estimate becomes a proposal with one click, and a signed proposal moves the lead to Booked and puts the job on the schedule, the pipeline finally reflects reality.",
          "This is where CRMs stop being a chore and start actually saving time.",
        ],
      },
      {
        heading: "How automation reduces manual work",
        paragraphs: [
          "Once conversations, estimates, and scheduling live in one place, automation becomes obvious. A missed call triggers a text-back. A new lead triggers an instant reply and a qualifying message. A signed proposal triggers a welcome email and adds the homeowner to a project update sequence. A completed job triggers a review request.",
          "None of these are complicated. They just need a system where the events are already being tracked.",
        ],
      },
      {
        heading: "What to look for in a contractor CRM",
        paragraphs: ["When evaluating a CRM for a remodeling business, look for these:"],
        bullets: [
          "A shared multi-channel inbox tied to every lead record.",
          "Estimates and proposals built inside the same platform.",
          "E-signature and payment collection without leaving the tool.",
          "A visual pipeline with stages that match your actual sales process.",
          "Automation triggers for missed calls, new leads, stage changes, and completed jobs.",
          "Scheduling that syncs with the crew calendar.",
          "Reporting that shows response time, conversion, and pipeline value.",
        ],
      },
      {
        heading: "Final takeaway",
        paragraphs: [
          "A contact list is not a CRM. For a remodeling business, the CRM needs to be the place the work actually happens — the inbox, the pipeline, the estimates, the schedule, and the follow-up in one connected system. That is when it stops being another tool and starts being the command center for the business.",
        ],
      },
      CTA_BLOCK,
    ],
  },
  {
    slug: "missed-call-text-back-for-contractors",
    title: "How Missed Call Text-Back Helps Contractors Book More Jobs",
    category: "Lead Response",
    excerpt:
      "Missed calls are one of the most expensive problems in home services. A simple automated text-back keeps the conversation alive and often books the job.",
    date: "April 8, 2026",
    readTime: "7 min read",
    metaTitle: "Missed Call Text-Back for Contractors: Book More Jobs | RenoMeta",
    metaDescription:
      "Missed call text-back helps contractors respond instantly when they miss a call, keeping leads warm and increasing booked appointments.",
    keywords: [
      "missed call text back",
      "missed call text-back for contractors",
      "contractor lead response",
      "home service automation",
      "construction lead follow-up",
    ],
    content: [
      {
        paragraphs: [
          "For most contractors, the phone is still the main way new work comes in. And for most contractors, a large share of those calls get missed. On a ladder, driving between jobs, on a loud site — the phone rings, and the moment passes.",
          "Very few of those callers leave a voicemail. Almost none call back a second time. They dial the next number on their list, and whoever answers wins the job.",
        ],
      },
      {
        heading: "Why missed calls cost contractors money",
        paragraphs: [
          "Every missed call from a new lead is a job that was one conversation away. Multiply that by a handful of missed calls a week, and the math is painful. A single kitchen remodel can be worth tens of thousands of dollars in revenue. Losing one a month to a missed call is a serious hit to the business.",
          "The frustrating part is that the lead was ready to talk. They picked up the phone. They chose to call. The only reason they went elsewhere is that nobody was there to catch them.",
        ],
      },
      {
        heading: "What missed call text-back is",
        paragraphs: [
          "Missed call text-back is a simple automation. The instant a call is missed, the caller receives a text message from the business number. Something short and human: an apology for missing the call, a quick question about the project, and a way to keep the conversation going.",
          "The homeowner does not have to try again. They do not have to leave a voicemail. They just get a friendly text and can reply on their own time.",
        ],
      },
      {
        heading: "Why speed-to-lead matters",
        paragraphs: [
          "Studies of home service and remodeling leads consistently show the same pattern: the business that responds first is the one that books the job. Not the cheapest, not the most polished — the fastest.",
          "A missed call answered by an automated text within seconds is often faster than a competitor's live receptionist. And because it opens a text thread, the conversation continues at the pace the homeowner wants.",
        ],
      },
      {
        heading: "Example contractor workflow",
        paragraphs: ["Here is what it looks like end to end:"],
        bullets: [
          "A homeowner calls a roofing company at 2:14 PM. The owner is on a roof and cannot answer.",
          "At 2:14 PM, the caller receives a text: \"Hi, this is Jake at Northline Roofing — sorry I missed your call. What can I help you with?\"",
          "The homeowner texts back a photo of a leak and asks for an estimate.",
          "The AI agent inside the CRM replies within a minute, asks two qualifying questions, and offers a site visit slot.",
          "By the time the owner is off the roof at 3:30 PM, the homeowner is booked for Thursday morning.",
        ],
      },
      {
        heading: "Benefits for remodeling and home service businesses",
        paragraphs: [
          "The direct benefit is more booked jobs from the same call volume. The indirect benefit is a better customer experience — homeowners feel respected instead of ignored, even when the team cannot pick up in person.",
          "There is also a compounding effect. Every text-back conversation creates a written record on the lead. Follow-up, quoting, and scheduling all become easier because the context is already there.",
        ],
      },
      {
        heading: "How missed call text-back works inside RenoMeta Connect",
        paragraphs: [
          "In RenoMeta Connect, missed call text-back is built into the multi-channel inbox and CRM. When a call is missed, the system automatically sends the text, opens a lead record, and drops the conversation into the shared inbox where any team member can pick it up.",
          "The AI agent can carry the first few messages if the team is unavailable, and the whole thread stays tied to the lead as it moves through the pipeline.",
        ],
      },
      {
        heading: "Final takeaway",
        paragraphs: [
          "Missed calls are not a phone problem. They are a systems problem. A short, automatic text-back is one of the smallest changes a contractor can make, and one of the biggest single improvements to booked appointments.",
        ],
      },
      CTA_BLOCK,
    ],
  },
  {
    slug: "future-of-remodeling-businesses-connected-automation",
    title: "The Future of Remodeling Businesses Is Connected Automation",
    category: "Automation",
    excerpt:
      "The future is not more tools. It is fewer, more connected ones. Here is what connected automation actually looks like inside a remodeling business.",
    date: "March 24, 2026",
    readTime: "8 min read",
    metaTitle: "The Future of Remodeling Businesses Is Connected Automation | RenoMeta",
    metaDescription:
      "Connected automation helps remodeling businesses reduce double-entry, improve follow-up, organize leads, and manage customer communication in one system.",
    keywords: [
      "remodeling business automation",
      "construction automation",
      "contractor automation software",
      "home service automation",
      "workflow automation for contractors",
    ],
    content: [
      {
        paragraphs: [
          "Ask most remodeling business owners what software they use, and they will list six or seven tools. A CRM, a form builder, a scheduling app, a proposal tool, an email platform, a review platform, a bookkeeping tool. Each one solves a real problem, but together they create a bigger one.",
          "The tools do not talk to each other. Information gets re-entered. Leads get lost between systems. The owner becomes the human integration layer, copying numbers from one screen to another.",
        ],
      },
      {
        heading: "Why disconnected tools slow contractors down",
        paragraphs: [
          "Every disconnected tool adds a handoff. A lead comes in through the website, gets copied into the CRM, gets emailed a proposal from a separate tool, gets booked in a third tool, and gets a review request from a fourth. Any one of those handoffs can silently break.",
          "The cost is not just wasted time. It is the leads that fall through the cracks between the tools.",
        ],
      },
      {
        heading: "What connected automation means",
        paragraphs: [
          "Connected automation means the tools live in one platform, share one record for each lead, and trigger each other automatically. A website form does not just capture data — it creates a lead, opens a conversation, sends the first reply, and books the appointment inside the same system.",
          "It is not about doing more with automation. It is about doing less by hand.",
        ],
      },
      {
        heading: "Examples of workflows contractors can automate",
        paragraphs: ["A few workflows that pay for themselves quickly:"],
        bullets: [
          "New website form triggers an instant reply and a qualifying message from an AI agent.",
          "Missed call triggers a text-back and creates a lead record.",
          "Qualified lead triggers an automated appointment offer with real crew availability.",
          "Signed proposal triggers a welcome email, a project kickoff task, and a calendar block.",
          "Completed job triggers a review request 24 hours later.",
          "Cold lead triggers a reactivation message 45 days after going quiet.",
        ],
      },
      {
        heading: "How automation improves customer experience",
        paragraphs: [
          "Homeowners do not care how the automation works. They care that they get a fast reply, clear next steps, and updates without having to chase.",
          "Connected automation makes small companies feel like well-run ones. A two-person remodeling business can respond as quickly as a national franchise, without hiring an office team.",
        ],
      },
      {
        heading: "Benefits for owners and office teams",
        paragraphs: [
          "The owner stops being the bottleneck for lead response and follow-up. The office manager stops copying data between tools. The crew gets cleaner handoffs because the job information is already in the schedule.",
          "Reporting also gets honest, because every step of the customer journey is captured in one place instead of scattered across seven platforms.",
        ],
      },
      {
        heading: "How RenoMeta Connect acts as the command center",
        paragraphs: [
          "RenoMeta Connect is designed to be that single platform. The website, inbox, CRM, estimates, scheduling, marketing, and reporting all sit on the same lead record. Automation is not an add-on — it is the connective tissue between the parts.",
          "The result is fewer tools to pay for, fewer places to check, and fewer leads that slip.",
        ],
      },
      {
        heading: "Final takeaway",
        paragraphs: [
          "The next wave of growth in remodeling is not about buying more software. It is about connecting the work that already happens, so the business runs smoothly with less effort from the owner.",
        ],
      },
      CTA_BLOCK,
    ],
  },
  {
    slug: "what-contractors-should-track-before-spending-more-on-ads",
    title: "What Contractors Should Track Before Spending More on Ads",
    category: "Marketing",
    excerpt:
      "More ad spend on a broken pipeline just wastes more money. Here are the numbers to fix first — and the ones that quietly decide whether ads pay off.",
    date: "March 10, 2026",
    readTime: "8 min read",
    metaTitle: "What Contractors Should Track Before Spending More on Ads | RenoMeta",
    metaDescription:
      "Before spending more on ads, contractors should track lead response time, follow-up, booked appointments, pipeline movement, and conversion rates.",
    keywords: [
      "contractor marketing analytics",
      "construction lead tracking",
      "remodeling marketing automation",
      "contractor ad tracking",
      "home service business growth",
    ],
    content: [
      {
        paragraphs: [
          "When work slows down, the first instinct for many contractors is to spend more on ads. More Google Local Service ads, more Facebook ads, more mailers. If leads are the problem, buy more leads.",
          "The problem is that in most home service businesses, leads are not the real issue. Conversion is. And more spend on a pipeline that is not converting well just makes the losses bigger and faster.",
        ],
      },
      {
        heading: "Why more leads do not always mean more jobs",
        paragraphs: [
          "A remodeling business getting 40 leads a month and closing 4 of them does not need 80 leads a month. It needs to understand why 36 of the current 40 are not becoming jobs.",
          "Some of that is normal — not every lead is qualified. But most contractors who look honestly at the numbers find that a large share of lost leads were losable to a faster reply, a clearer estimate, or a single follow-up nobody sent.",
        ],
      },
      {
        heading: "The hidden problem: poor lead conversion",
        paragraphs: [
          "Poor conversion is usually invisible because nobody is measuring it. Leads come in, the owner replies to the ones they see, some become jobs, the rest quietly disappear.",
          "Without tracking, it is impossible to tell whether the ad channel is bad, the lead quality is bad, or the follow-up is bad. Usually it is the follow-up.",
        ],
      },
      {
        heading: "Metrics contractors should track",
        paragraphs: ["Before increasing ad spend, get honest numbers on these:"],
        bullets: [
          "Lead source — where each inquiry came from.",
          "Response time — how long until the first human or automated reply.",
          "Contact rate — the percentage of leads you actually reached.",
          "Appointment rate — the percentage that booked a site visit or call.",
          "Estimate sent rate — the percentage that received a real quote.",
          "Close rate — the percentage that signed and became a job.",
          "Average job value by source.",
          "Follow-up activity — how many touches each lead received.",
        ],
      },
      {
        heading: "How CRM and automation improve visibility",
        paragraphs: [
          "These numbers only exist if the CRM is where the work happens. If half the conversations live on the owner's personal phone, no report is going to be accurate.",
          "When the inbox, pipeline, estimates, and scheduling all sit inside the same CRM, the numbers get captured automatically. Nobody has to remember to log a call or record a stage change.",
        ],
      },
      {
        heading: "Why reporting matters before increasing ad spend",
        paragraphs: [
          "With honest numbers, ad spend becomes a decision instead of a hope. If Google Local Service ads produce a 6 percent close rate at a $180 cost per lead, and Facebook produces a 12 percent close rate at $90, the answer is obvious.",
          "Without those numbers, every ad decision is a guess dressed up as a strategy.",
        ],
      },
      {
        heading: "How RenoMeta Connect helps track the customer journey",
        paragraphs: [
          "RenoMeta Connect captures the full customer journey on one record: the ad or source that brought the lead in, every conversation, the appointment, the estimate, the proposal, the signed job, and the final revenue.",
          "That means the reporting stops being about clicks and starts being about closed jobs by source, which is the only number that decides whether an ad channel is worth more money.",
        ],
      },
      {
        heading: "Final takeaway",
        paragraphs: [
          "Ads amplify what a business already is. A business with fast response, clean follow-up, and honest reporting turns more ad spend into more jobs. A business without those things turns more ad spend into more waste. Fix the pipeline first, then scale the spend.",
        ],
      },
      CTA_BLOCK,
    ],
  },
  {
    slug: "why-contractors-lose-leads-after-the-first-inquiry",
    title: "Why Contractors Lose Leads After the First Inquiry",
    category: "Lead Response",
    excerpt:
      "Most lost jobs are decided in the first hour. Here is where the drop-off happens and how to close the gap.",
    date: "February 24, 2026",
    readTime: "6 min read",
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
