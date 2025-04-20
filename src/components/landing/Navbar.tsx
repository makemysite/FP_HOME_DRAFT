
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center gap-[40px_100px] text-center flex-wrap max-md:max-w-full">
      <Link to="/">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/f5c25da502e1d373adabf184e60dd9d28eead17e?placeholderIfAbsent=true"
          alt="Field Promax Logo"
          className="aspect-[1.73] object-contain w-[152px] self-stretch shrink-0 my-auto"
        />
      </Link>
      <div className="self-stretch flex min-w-60 items-center gap-[40px_65px] text-base text-[rgba(7,15,24,1)] font-normal whitespace-nowrap flex-wrap my-auto max-md:max-w-full">
        <Link
          to="/"
          className="text-[rgba(18,20,22,1)] self-stretch my-auto hover:text-[rgba(233,138,35,1)] transition-colors"
        >
          Home
        </Link>
        <Link
          to="/features"
          className="self-stretch my-auto hover:text-[rgba(233,138,35,1)] transition-colors"
        >
          Features
        </Link>
        <Link
          to="/pricing"
          className="self-stretch my-auto hover:text-[rgba(233,138,35,1)] transition-colors"
        >
          Pricing
        </Link>
        <Link
          to="/industries"
          className="self-stretch my-auto hover:text-[rgba(233,138,35,1)] transition-colors"
        >
          Industries
        </Link>
        <Link
          to="/blog"
          className="self-stretch my-auto hover:text-[rgba(233,138,35,1)] transition-colors"
        >
          Blogs
        </Link>
        <Link
          to="/contact"
          className="self-stretch my-auto hover:text-[rgba(233,138,35,1)] transition-colors"
        >
          Contact
        </Link>
      </div>
      <div className="self-stretch flex min-w-60 items-center gap-8 text-lg my-auto">
        <div className="self-stretch text-[rgba(7,15,24,1)] font-normal w-[150px] my-auto rounded-[56px]">
          <button className="bg-[rgba(245,246,251,1)] border px-[15px] py-[19px] rounded-[56px] border-[rgba(233,138,35,1)] border-solid max-md:px-5 w-full hover:bg-[rgba(245,246,251,0.8)] transition-colors">
            Log in
          </button>
        </div>
        <button className="self-stretch bg-[rgba(233,138,35,1)] shadow-[0px_3px_12px_rgba(74,58,255,0.18)] min-h-[55px] gap-2 text-white font-medium leading-none w-[193px] my-auto px-[39px] py-[18px] rounded-[56px] max-md:px-5 hover:bg-[rgba(233,138,35,0.9)] transition-colors">
          Take free trial
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
