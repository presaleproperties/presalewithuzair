import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import { format, parse } from "date-fns";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    date: "",
    time: "",
    email: "",
  });

  useEffect(() => {
    // Get booking details from URL params or sessionStorage
    const firstName = searchParams.get('name') || sessionStorage.getItem('booking_firstName') || '';
    const date = searchParams.get('date') || sessionStorage.getItem('booking_date') || '';
    const time = searchParams.get('time') || sessionStorage.getItem('booking_time') || '';
    const email = searchParams.get('email') || sessionStorage.getItem('booking_email') || '';

    setBookingDetails({ firstName, date, time, email });

    // Clear session storage after reading
    sessionStorage.removeItem('booking_firstName');
    sessionStorage.removeItem('booking_date');
    sessionStorage.removeItem('booking_time');
    sessionStorage.removeItem('booking_email');
  }, [searchParams]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "To be confirmed";
    try {
      const date = parse(dateStr, "yyyy-MM-dd", new Date());
      return format(date, "EEEE, MMMM d, yyyy");
    } catch {
      return dateStr;
    }
  };

  const nextSteps = [
    {
      icon: Mail,
      title: "Check your email",
      description: "You'll receive a confirmation email with call details shortly.",
    },
    {
      icon: Calendar,
      title: "Add to your calendar",
      description: "Mark the date so you don't forget our consultation.",
    },
    {
      icon: MessageSquare,
      title: "Prepare your questions",
      description: "Write down any questions or concerns you want to discuss.",
    },
  ];

  // Generate Google Calendar link
  const generateCalendarLink = () => {
    if (!bookingDetails.date || !bookingDetails.time) return "#";
    
    try {
      const dateStr = bookingDetails.date;
      const timeStr = bookingDetails.time;
      
      // Parse time (e.g., "9:00 AM" -> 9, "1:00 PM" -> 13)
      const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeMatch) return "#";
      
      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const period = timeMatch[3].toUpperCase();
      
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      
      // Create start date
      const startDate = new Date(`${dateStr}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`);
      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 min later
      
      const formatForCalendar = (d: Date) => {
        return d.toISOString().replace(/-|:|\.\d{3}/g, '').slice(0, 15) + 'Z';
      };
      
      const calendarUrl = new URL('https://calendar.google.com/calendar/render');
      calendarUrl.searchParams.set('action', 'TEMPLATE');
      calendarUrl.searchParams.set('text', 'Presale Consultation with Uzair');
      calendarUrl.searchParams.set('dates', `${formatForCalendar(startDate)}/${formatForCalendar(endDate)}`);
      calendarUrl.searchParams.set('details', 'Your 30-minute presale advisory consultation. Uzair will call you at the scheduled time.');
      
      return calendarUrl.toString();
    } catch {
      return "#";
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Helmet>
        <title>Payment Confirmed | Presale with Uzair</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="Presale with Uzair" className="h-8" />
        </div>

        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Payment Confirmed!
          </h1>
          <p className="text-muted-foreground">
            {bookingDetails.firstName 
              ? `Thank you, ${bookingDetails.firstName}! Your consultation is booked.`
              : "Your consultation is booked."
            }
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Your Consultation
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {formatDate(bookingDetails.date)}
                </p>
                <p className="text-primary font-semibold">
                  {bookingDetails.time || "Time to be confirmed"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  30-minute advisory call
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>Uzair will call you at the scheduled time</span>
            </div>
          </div>

          {/* Add to Calendar Button */}
          {bookingDetails.date && bookingDetails.time && (
            <a
              href={generateCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block"
            >
              <Button 
                variant="outline" 
                className="w-full h-12 gap-2"
              >
                <Download className="w-4 h-4" />
                Add to Google Calendar
              </Button>
            </a>
          )}
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            What's Next?
          </h2>
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-muted/50 rounded-xl p-4 text-center mb-6"
        >
          <p className="text-sm text-muted-foreground mb-2">
            Questions before our call?
          </p>
          <a 
            href="mailto:uzair@presalewithuzair.com" 
            className="text-primary font-medium hover:underline"
          >
            uzair@presalewithuzair.com
          </a>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link to="/">
            <Button 
              variant="ghost" 
              className="w-full h-12 text-muted-foreground hover:text-foreground gap-2"
            >
              Back to Homepage
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
