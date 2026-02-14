import { Helmet } from "react-helmet-async";

const Book = () => {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col dark-section">
      <Helmet>
        <title>Book a Call | Presale with Uzair</title>
        <meta name="description" content="Schedule a one-on-one call with Uzair to discuss your presale real estate needs." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://presalewithuzair.com/book" />
      </Helmet>

      {/* Full-screen Calendly embed */}
      <div className="flex-1 w-full">
        <iframe
          src="https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=1c1510&text_color=f2ede5&primary_color=d4a316"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Schedule a meeting with Uzair"
          className="min-h-screen min-h-[100dvh]"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default Book;
