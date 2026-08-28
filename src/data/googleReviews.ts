// Verbatim Google reviews — single source of truth. Text copied exactly from Google.
// Client photos are fallbacks used only when a Google photo URL is missing.
import michellePhoto from "@/assets/testimonials/michelle.jpg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";
import sonaliPhoto from "@/assets/testimonials/sonali.jpg";
import hissanPhoto from "@/assets/testimonials/hissan.jpg";
import andresPhoto from "@/assets/testimonials/andres.jpg";
import adamPhoto from "@/assets/testimonials/adam.jpg";
import miwaPhoto from "@/assets/testimonials/miwa.jpg";
import mehreenPhoto from "@/assets/testimonials/mehreen.jpg";
import baldeepPhoto from "@/assets/testimonials/baldeep.jpg";
import jamilaPhoto from "@/assets/testimonials/jamila.jpg";
import monaPhoto from "@/assets/testimonials/mona.jpg";
import akhiPhoto from "@/assets/testimonials/akhi.jpg";
import bryantPhoto from "@/assets/testimonials/bryant.jpg";
import rehmanPhoto from "@/assets/testimonials/rehman.jpg";

export interface StaticReview {
  name: string;
  quote: string;
  timeAgo: string;
  /** Absolute month/year the review was posted, when known. */
  date?: string;
  photo: string;
  rating?: number;
  highlight?: boolean;
}

// Verbatim Google reviews (originals only — no rewrites, no paraphrasing).
export const staticReviews: StaticReview[] = [
  {
    name: "Amarpal Singh",
    quote:
      "Had an greatest experience working with Uzair for our new purchase. Very knowledgeable and professional. Great realtor and an awesome person. Guide me with all information needed. As I was moving from Alberta give me all the best information and knowledge you need to start in new province. Purchasing a house is a big decision. I'll highly recommend Uzair.",
    timeAgo: "April 2026",
    date: "April 2026",
    photo: rayPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "Ammar Ahmad",
    quote:
      "Had the honour of having Uzair as our real estate agent and he had offered great customers service for buying a home. He guided us through everything, mortgage and notary etc. guided us where to go, which is really great for customers. On the completion date, he greeted us with the gift box at door. Would recommend.",
    timeAgo: "April 2026",
    date: "April 2026",
    photo: bryantPhoto,
    rating: 5,
  },
  {
    name: "Anish Bhalla",
    quote:
      "We had an absolutely fantastic experience working with Uzair, and we couldn’t be happier with how everything turned out. As first-time home buyers, we were understandably nervous about the process, but from day one he made everything feel clear, manageable, and stress-free.\n\nUzair is incredibly knowledgeable about the market and took the time to truly understand what we were looking for in a townhouse for our family. Every question we had was answered thoroughly, and they always explained things in a way that made us feel confident and informed at every step. We never once felt rushed or pressured only supported.\n\nWhat really stood out was his professionalism and attention to detail throughout the entire process, from viewings to offers to closing. He was proactive, responsive, and always had our best interests in mind. Thanks to his guidance and expertise, we found the right townhouse that perfectly fits our family’s needs.\n\nWe are so grateful for the care, patience, and dedication Uzair showed us during such an important milestone. We would highly recommend Uzair especially first-time buyers looking for a realtor who is trustworthy, knowledgeable, and genuinely invested in their clients’ success.",
    timeAgo: "December 2025",
    date: "December 2025",
    photo: anishPhoto,
    rating: 5,
  },
  {
    name: "Zain Waheed",
    quote:
      "Uzair made the process easy from start to finish. We couldn’t be happier with our place and if it wasn’t for Uzair we wouldn’t have found it at the time we did. He explained things throughly and went out of his way to make sure we got exactly what we were looking for. Apart from that after we completed the process for the house, Uzair went a step beyond and provided us with loads of resources that we took full advantage of to maximize our home.",
    timeAgo: "February 2026",
    date: "February 2026",
    photo: rehmanPhoto,
    rating: 5,
  },
  {
    name: "Michelle Li",
    quote:
      "Uzair was very knowledgeable when I first approached him about purchasing my first home.  I had some questions about presale homes and homes already in the market.  Uzair was able to answer my questions honestly and provide me options for both.  After discussing my specific circumstances,  I decided to go with a presale. We took a look at a few showrooms and discussed what was more suited to me, both presently and for the future.  Uzair made sure I was kept up to date throughout the process and ensured my possession went smoothly. I definitely recommend reaching out to him if you're thinking about purchasing a presale property.  He's not one to pressure you into making a decision if it's not the right one for you.",
    timeAgo: "November 2025",
    date: "November 2025",
    photo: michellePhoto,
    rating: 5,
  },

  {
    name: "Andres Jaramillo",
    quote:
      "Uzair made what could have been a really difficult transaction as finding our first home in a new market we knew nothing about, he turned it into an easy and enjoyable process. Guided us through the process from the search all the way to completion.\nNext time we are back looking for properties, we will get him on our side for sure.\nI’d recommend Uzair and his team to anyone.",
    timeAgo: "7 months ago",
    photo: andresPhoto,
    rating: 5,
  },
  {
    name: "Jamila Kirama",
    quote:
      "I had an amazing experience working with Uzair! From start to finish, he is professional, knowledgeable, and always had my best interests at heart. He made the entire buying/selling process smooth and stress-free, answering all my questions and keeping me informed every step of the way. His attention to detail, market expertise, and dedication truly set them apart. I highly recommend Uzair to anyone looking for a top-notch real estate professional!",
    timeAgo: "a year ago",
    photo: jamilaPhoto,
    rating: 5,
  },
  {
    name: "Exponential Real Estate",
    quote:
      "Uzair is an excellent agent who fights for his clients, writes a good contract that protects his clients yet is flexible enough to get the deal done. This was my first time working with Uzair and I am impressed by his professionalism and knowledge. Would love to do another deal soon with such a good agent.",
    timeAgo: "a year ago",
    photo: baldeepPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "Adam Lai",
    quote:
      "Uzair helped me with my investment property, and I couldn’t be more grateful. He’s focused on making sure you get the best deal and\nguiding you through every step of the process. He’s straightforward, easy to work with, and truly knows the market. If a deal or project isn’t right, he’ll tell you exactly that, no fluff, no hype. You can always count on his honesty and expertise!",
    timeAgo: "a year ago",
    photo: adamPhoto,
    rating: 5,
  },
  {
    name: "Ehsan Khan",
    quote:
      "Uzair is a very professional, kind, and helpful realtor. Him and his team work diligently in the best interest of their clients. He is very reliable, honest, and communicates clearly and promptly. There is never any \"fine print\" or surprises. I would highly recommend him and his services to everybody. We will definitely contact him again for future buying and selling. Thank you for your excellent services and pleasant experience :)",
    timeAgo: "3 years ago",
    photo: rehmanPhoto,
    rating: 5,
  },
  {
    name: "Mehreen Chaudry",
    quote:
      "I have been working with Uzair for a number of years he is an expert in his knowledge about presale in Vancouver. His personalized approach for his client is what makes it very easy to work with him. I would highly recommend that if you are considering presale to get in contact with Uzair.",
    timeAgo: "a year ago",
    photo: mehreenPhoto,
    rating: 5,
  },
  {
    name: "Ray M",
    quote:
      "Now I see why he's called the \"presale expert.\" Uzair's expertise in the presale market is exceptional. His strong relationships with developers enabled us to secure the best unit in the building at an incredible price. It was an outstanding experience. Thank you Uzair, for your hard work, transparency, and guidance in helping my family find our first home within 2 weeks!!",
    timeAgo: "a year ago",
    photo: rayPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "alladi tejaswini",
    quote:
      "Uzair is a very professional and agile realtor. Keeps your requirements in mind and works towards getting it done for you. He was our realtor for buying new property and selling ours. Highly recommend him and will be going with him for next purchase as well.",
    timeAgo: "4 years ago",
    photo: sonaliPhoto,
    rating: 5,
  },
  {
    name: "M Hissan Zafar",
    quote:
      "Uzair is brilliant to work with\nI had an amazing experience with him and as a first time home buyer he guided me throughout the journey and made sure i feel comfortable and even after getting the house he is there to help me on different upgrades",
    timeAgo: "2 years ago",
    photo: hissanPhoto,
    rating: 5,
  },
  {
    name: "Miwa Karaki",
    quote:
      "Uzair's knowledge of presales is incredible. Whenever we find a presale project to invest in, he already knows about it and provides us with a lot of information. We know he is busy but he's always willing to help with anything. We truly appreciate his assistance!",
    timeAgo: "a year ago",
    photo: miwaPhoto,
    rating: 5,
  },
  {
    name: "Mona Alkurdi",
    quote:
      "Very honest realtor who speaks the best for his clients as a priority. We have been working with him for years and he never failed us. I advise anyone to work with this amazing person.",
    timeAgo: "a year ago",
    photo: monaPhoto,
    rating: 5,
  },
  {
    name: "Akhi Thapar",
    quote:
      "I have been working with uzair for nearly 3 years now and will highly recommend him for any sale or purchase of the property.",
    timeAgo: "2 years ago",
    photo: akhiPhoto,
    rating: 5,
  },
];
