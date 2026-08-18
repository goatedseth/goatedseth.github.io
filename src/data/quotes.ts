export type Dialogue = { speaker: string; line: string }[];

export type Quote = {
  id: string;
  text?: string;
  dialogue?: Dialogue;
  note?: string;
  subject?: string;
};

export const RANGE = "07/15/2026 — 08/28/2026";

/** Verbatim source material. Do not rewrite, censor, correct, or embellish. */
export const quotes: Quote[] = [
  { id: "001", text: "It’s the same fucking software", subject: "Version Control" },
  { id: "002", text: "Shit gets broken here all the time", note: "referring to the IT department", subject: "Institutional Entropy" },
  { id: "003", text: "I love nerd shit", subject: "Self Identification" },
  { id: "004", text: "I was doing 18 credit hours of all CS classes and wanted to kill myself", subject: "Formal Education" },
  { id: "005", text: "I could unfuck it. But it just kind of kicks the can down the road and other people could fuck it up later", subject: "Technical Debt" },
  { id: "006", text: "If we inject some random bullshit, I wanna see those letters on the page, that’d make me feel better", subject: "Debug Methodology" },
  { id: "007", text: "So, somehow the routing table is fucked up", subject: "Networking" },
  { id: "008", text: "Oh you dumb bitch", note: "referring to a SQL query", subject: "Database Management" },
  { id: "009", text: "I knew that wasn’t gonna fucking work and now I just made more fucking work for myself", subject: "Foresight" },
  { id: "010", text: "I don’t know how I got it because I wasn’t kissing anyone at that time", note: "talking about some disease", subject: "Epidemiology" },
  { id: "011", text: "I think I need to do some fucking drugs", subject: "Coping Strategy" },
  { id: "012", text: "But until AI can get black out drunk, call its wife a bitch, and then wake up in a pool of its own piss, it can't do what I can.", subject: "Observation on Automation" },
  { id: "013", text: "That’s why I wasn’t such a slut in college", note: "because of chlamydia", subject: "Risk Management" },
  { id: "014", text: "I can’t answer that without being racist", subject: "Disclosure" },
  { id: "015", text: "Fuck that technology, fuck whoever made it", subject: "Vendor Relations" },
  { id: "016", text: "XSLT is the biggest bitch in the entire world", subject: "Legacy Systems" },
  { id: "017", text: "I realized I needed to figure my life out but I didn’t", subject: "Life Stages" },
  { id: "018", text: "Genetically speaking, all Latinas have BPD", subject: "Unlicensed Genetics" },
  { id: "019", text: "Publish it and see if it fixes or fucks it", subject: "Deployment Policy" },
  { id: "020", text: "I just looked at the radar, can I trust you to delete my browsing history if something happens? Throw my phone in a river", subject: "Contingency Planning" },
  { id: "021", text: "This is the real answer, but not formatted like it ate Tylenol for cereal", note: "referring to a block of code", subject: "Code Review" },
  {
    id: "022",
    dialogue: [
      { speaker: "Me", line: "Why would it change that by itself?" },
      { speaker: "Seth", line: "Because computers are fucking stupid. 12 years I’ve been doing this and always see little shit like that" },
    ],
    subject: "Root Cause Analysis",
  },
  { id: "023", text: "Yunno, I get a lot of neck pain cos my brain weighs so much carrying all this knowledge", subject: "Occupational Health" },
  {
    id: "024",
    dialogue: [
      { speaker: "Me", line: "Why is the HPS database called HPS not HSP?" },
      { speaker: "Seth", line: "Alcohol" },
    ],
    subject: "Naming Conventions",
  },
  {
    id: "025",
    dialogue: [
      { speaker: "Me", line: "So if I’m not diagnosed with ADHD, it’s called hyper focus?" },
      { speaker: "Seth", line: "Not sure tbh. I know it’s a trait of ADHD. And Meth" },
    ],
    subject: "Clinical Consultation",
  },
  { id: "026", text: "Thank god I was home naked, sorry I meant home alone", subject: "Errata" },
  { id: "027", text: "That shit (fiberglass) will impregnate your skin, put little babies on there", subject: "Safety Briefing" },
  { id: "028", text: "I’m glad HR is upstairs", subject: "Office Hygiene" },
  { id: "029", text: "I admit that I do look more like a woman that I anticipated", subject: "Self Assessment" },
  {
    id: "030",
    dialogue: [
      { speaker: "Juan", line: "Oh he’s talking about the old stuff again (2010s)" },
      { speaker: "Seth", line: "instantaneously Fuck you" },
    ],
    subject: "Peer Review",
  },
  { id: "031", text: "Bitch is my favorite word", subject: "Lexicography" },
  { id: "032", text: "Lol I’d be hungover on a Monday", subject: "Availability" },
  { id: "033", text: "I honestly have no idea how I’m still alive", subject: "Uptime" },
  { id: "034", text: "Never pass up a bathroom, never waste a hard-on, and never trust a fart", subject: "Universal Doctrine" },
  { id: "035", text: "I've never felt so cucked in my life (referring to claude code limits)", subject: "Rate Limiting" },
];

export const byId = (id: string): Quote => quotes.find((q) => q.id === id)!;
