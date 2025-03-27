
import React, { useState } from "react";

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState("reports");

  const features = {
    reports: {
      title: "Reports and Dashboard",
      description:
        "Get the best inspiration from the best creative talent worldwide.",
      icon: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/66f38502a5fef33818316ca0f35b1bc4094641c8?placeholderIfAbsent=true",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/dc35a0569446e6309fd19516f55984c7f2a0535e?placeholderIfAbsent=true",
    },
    tools: {
      title: "Tools & Integrations",
      description:
        "Connect with your favorite tools and automate your workflow.",
      icon: "",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/dc35a0569446e6309fd19516f55984c7f2a0535e?placeholderIfAbsent=true",
    },
    scheduling: {
      title: "Smart Scheduling",
      description:
        "Optimize your team's schedule with AI-powered recommendations.",
      icon: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/90cb4c0f51b0744019a62d928e470e8fb001908f?placeholderIfAbsent=true",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/dc35a0569446e6309fd19516f55984c7f2a0535e?placeholderIfAbsent=true",
    },
    invoicing: {
      title: "Invoicing & Payments",
      description: "Streamline your billing process and get paid faster.",
      icon: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/c5a7c18383b0c23ef99644f4f1abd3fdc92273d3?placeholderIfAbsent=true",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/dc35a0569446e6309fd19516f55984c7f2a0535e?placeholderIfAbsent=true",
    },
  };

  return (
    <section
      id="features"
      className="flex w-full max-w-[1335px] flex-col items-center mt-14 max-md:max-w-full max-md:mt-10"
    >
      <div className="text-[rgba(233,138,35,1)] text-lg font-bold leading-none tracking-[1.8px] text-center uppercase">
        Features
      </div>
      <h2 className="text-[#170F49] text-center text-[50px] font-bold leading-[62px] w-[668px] mt-7 max-md:max-w-full max-md:text-[40px] max-md:leading-[55px]">
        Spend Less Time Managing and More Time Growing
      </h2>
      <div className="text-[#26393F] text-center text-lg font-normal leading-loose mt-[29px] max-md:max-w-full">
        Automate Your Service Business With Our Exclusive Features
      </div>
      <button className="bg-[rgba(245,246,251,1)] border w-[175px] max-w-full text-lg text-[rgba(7,15,24,1)] font-normal text-center mt-[29px] px-5 py-[21px] rounded-[56px] border-[rgba(233,138,35,1)] border-solid hover:bg-[rgba(245,246,251,0.8)] transition-colors">
        View all features
      </button>

      <div className="self-stretch max-md:max-w-full mt-14">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[43%] max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col self-stretch my-auto max-md:max-w-full max-md:mt-10">
              {/* Reports and Dashboard */}
              <div
                className={`${activeFeature === "reports" ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)]" : ""} bg-white self-stretch flex min-h-[142px] w-full flex-col px-[22px] py-7 max-md:max-w-full max-md:px-5 cursor-pointer`}
                onClick={() => setActiveFeature("reports")}
              >
                <div className="flex w-[361px] max-w-full gap-[17px] text-lg text-[rgba(233,138,35,1)] font-bold leading-[3] pb-1.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/66f38502a5fef33818316ca0f35b1bc4094641c8?placeholderIfAbsent=true"
                    alt="Reports Icon"
                    className="aspect-[1] object-contain w-9 shrink-0"
                  />
                  <div className="grow shrink w-[301px] basis-auto mt-3.5">
                    Reports and Dashboard
                  </div>
                </div>
                {activeFeature === "reports" && (
                  <div className="flex gap-[40px_60px] text-sm text-[#202225] font-normal leading-[22px] flex-wrap px-[54px] max-md:max-w-full max-md:px-5">
                    <div className="w-[276px]">
                      Get the best inspiration from the best creative talent
                      worldwide.
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/dbd369672bbf00f24b468570ffd9e0129b88dc46?placeholderIfAbsent=true"
                      alt="Arrow Icon"
                      className="aspect-[1] object-contain w-[39px] shrink-0"
                    />
                  </div>
                )}
              </div>

              {/* Tools & Integrations */}
              <div
                className={`${activeFeature === "tools" ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)]" : ""} bg-white flex min-h-[109px] gap-[17px] text-lg text-[#202225] font-bold leading-[3] px-[22px] py-[34px] max-md:px-5 cursor-pointer`}
                onClick={() => setActiveFeature("tools")}
              >
                <div className="min-w-60 w-[361px] px-[53px] py-[13px] max-md:px-5">
                  Tools & Integrations
                </div>
              </div>
              <div className="border w-[465px] shrink-0 max-w-full h-px border-[rgba(225,225,225,1)] border-solid" />

              {/* Smart Scheduling */}
              <div
                className={`${activeFeature === "scheduling" ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)]" : ""} bg-white flex min-h-[109px] gap-[17px] text-lg text-[#202225] font-bold leading-[3] px-[22px] py-[34px] max-md:px-5 cursor-pointer`}
                onClick={() => setActiveFeature("scheduling")}
              >
                <div className="flex min-w-60 w-[361px] gap-[17px] pb-1.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/90cb4c0f51b0744019a62d928e470e8fb001908f?placeholderIfAbsent=true"
                    alt="Scheduling Icon"
                    className="aspect-[1] object-contain w-9 shrink-0"
                  />
                  <div className="grow shrink w-[301px] basis-auto mt-3.5">
                    Smart Scheduling
                  </div>
                </div>
              </div>
              <div className="border w-[465px] shrink-0 max-w-full h-px border-[rgba(225,225,225,1)] border-solid" />

              {/* Invoicing & Payments */}
              <div
                className={`${activeFeature === "invoicing" ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)]" : ""} bg-white flex min-h-[109px] gap-[17px] text-lg text-[#202225] font-bold leading-[3] px-[22px] py-[34px] max-md:px-5 cursor-pointer`}
                onClick={() => setActiveFeature("invoicing")}
              >
                <div className="flex min-w-60 w-[361px] gap-[17px] pb-1.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/c5a7c18383b0c23ef99644f4f1abd3fdc92273d3?placeholderIfAbsent=true"
                    alt="Invoicing Icon"
                    className="aspect-[1] object-contain w-9 shrink-0"
                  />
                  <div className="grow shrink w-[301px] basis-auto mt-3.5">
                    Invoicing & Payments
                  </div>
                </div>
              </div>
              <div className="border w-[465px] shrink-0 max-w-full h-px border-[rgba(225,225,225,1)] border-solid" />
            </div>
          </div>
          <div className="w-[57%] ml-5 max-md:w-full max-md:ml-0">
            <img
              src={features[activeFeature as keyof typeof features].image}
              alt="Feature Screenshot"
              className="aspect-[1.4] object-contain w-full grow max-md:max-w-full max-md:mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

