
import React, { useState } from "react";

interface DemoFormProps {
  className?: string;
}

const DemoForm: React.FC<DemoFormProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-stretch ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required
        className="bg-[rgba(245,246,251,1)] mr-[-62px] text-[rgba(87,84,85,1)] font-normal grow shrink-0 basis-0 w-fit px-6 py-3.5 rounded-[50px] max-md:px-5 focus:outline-none focus:ring-2 focus:ring-[rgba(233,138,35,0.5)]"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[rgba(233,138,35,1)] shadow-[0px_3px_12px_rgba(74,58,255,0.18)] min-h-[55px] text-white font-medium leading-none px-[39px] py-[18px] rounded-[56px] hover:bg-[rgba(233,138,35,0.9)] transition-colors"
      >
        {isSubmitting
          ? "Submitting..."
          : isSubmitted
            ? "Submitted!"
            : "Take a Demo"}
      </button>
    </form>
  );
};

export default DemoForm;
