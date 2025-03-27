
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the testimonial data structure
interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Without any doubt I recommend Alcaline Solutions as one of the best web design and digital marketing agencies. One of the best agencies I've came across so far. Wouldn't be hesitated to introduce their work to someone else.",
    name: "Romeena De Silva",
    company: "Janet Cosmetics"
  },
  {
    quote: "The team at Alcaline Solutions has transformed our field service operations. Their software is intuitive and has helped us increase productivity by 40%. Customer support is responsive and always ready to help.",
    name: "Michael Rodriguez",
    company: "Elite Maintenance Services"
  },
  {
    quote: "After trying several field service solutions, we finally found Alcaline. The scheduling and dispatching features have eliminated double-bookings and our technicians love the mobile app. It's been a game-changer for our business.",
    name: "Sarah Johnson",
    company: "Precision HVAC Solutions"
  },
  {
    quote: "We've been using Alcaline Solutions for over a year now, and the ROI has been incredible. The invoicing system alone has reduced our billing time by 65%. I can't imagine running our business without it now.",
    name: "David Chen",
    company: "Pacific Plumbing Co."
  },
  {
    quote: "The customization options available with Alcaline's software allowed us to tailor it perfectly to our electrical contracting business. The team was responsive throughout implementation and training was excellent.",
    name: "Emily Taylor",
    company: "Voltage Electric Inc."
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="w-full max-w-[1335px] flex flex-col items-center mt-[141px] max-md:max-w-full max-md:mt-10"
    >
      <div className="text-[rgba(233,138,35,1)] text-lg font-bold leading-none tracking-[1.8px] text-center uppercase">
        Reviews & Feedback
      </div>
      <div className="flex w-[474px] max-w-full flex-col items-center text-[35px] text-[#1A202C] font-bold text-center leading-[55px] mt-[94px] max-md:mt-10">
        <div className="bg-[rgba(233,138,35,1)] flex min-h-[5px] w-[69px]" />
        <h2 className="mt-5 max-md:max-w-full">
          <span className="font-normal">Why cutomers love</span>
          <br />
          working with us
        </h2>
      </div>
      
      <div className="w-full max-w-[727px] mt-[51px] relative max-md:mt-10">
        {/* Fixed quotation marks */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/f4add18242878713b4547350495fce8416570985?placeholderIfAbsent=true"
          alt="Quote Open"
          className="absolute left-0 top-3 aspect-[1] object-contain w-10 shrink-0 z-10"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/2ce440a684a36a9d5fafa6e3e787b5eb52f448fc?placeholderIfAbsent=true"
          alt="Quote Close"
          className="absolute right-0 bottom-[121px] aspect-[1] object-contain w-10 shrink-0 z-10 max-md:bottom-auto max-md:top-[60%]"
        />
        
        {/* Carousel with just the testimonial content */}
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: "center",
          }}
          setApi={(api) => {
            if (api) {
              api.scrollTo(activeIndex);
            }
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="flex flex-col items-center">
                <div className="flex w-full gap-[40px_66px] text-lg text-[#718096] font-normal text-center leading-9 flex-wrap px-16">
                  <blockquote className="w-full mt-3 max-md:max-w-full min-h-[200px] flex items-center justify-center">
                    {testimonial.quote}
                  </blockquote>
                </div>
                <div className="flex flex-col items-center text-center justify-center mt-8">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn("h-6 w-6 fill-[#E98A23] text-[#E98A23]")}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-center justify-center mt-[15px]">
                    <div className="text-[#E98A23] text-lg font-bold tracking-[-0.09px]">
                      {testimonial.name}
                    </div>
                    <div className="text-black text-sm font-normal leading-loose">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === index
                ? "bg-[#E98A23] w-6"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
