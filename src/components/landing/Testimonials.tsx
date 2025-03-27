import React from "react";

const Testimonials: React.FC = () => {
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
      <div className="flex w-[727px] max-w-full gap-[40px_66px] text-lg text-[#718096] font-normal text-center leading-9 flex-wrap mt-[51px] max-md:mt-10">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/f4add18242878713b4547350495fce8416570985?placeholderIfAbsent=true"
          alt="Quote Open"
          className="aspect-[1] object-contain w-10 shrink-0"
        />
        <blockquote className="grow shrink w-[503px] mt-3 max-md:max-w-full">
          Without any doubt I recommend Alcaline Solutions as one of the best
          web design and digital marketing agencies. One of the best agencies
          I've came across so far. Wouldn't be hesitated to introduce their work
          to someone else.
        </blockquote>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/2ce440a684a36a9d5fafa6e3e787b5eb52f448fc?placeholderIfAbsent=true"
          alt="Quote Close"
          className="aspect-[1] object-contain w-10 shrink-0 mt-[121px] max-md:mt-10"
        />
      </div>
      <div className="flex flex-col items-center text-center justify-center mt-8">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#E98A23"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mt-[15px]">
          <div className="text-[#E98A23] text-lg font-bold tracking-[-0.09px]">
            Romeena De Silva
          </div>
          <div className="text-black text-sm font-normal leading-loose">
            Janet Cosmetics
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
