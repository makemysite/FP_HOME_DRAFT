
import React, { useState } from "react";
import CheckIcon from "../ui/CheckIcon";
import { Switch } from "../ui/switch";

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly",
  );

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly");
  };

  // Define pricing based on billing cycle
  const pricing = {
    light: billingCycle === "monthly" ? 
      { amount: "99", period: "monthly" } : 
      { amount: "999", period: "annually" },
    standard: billingCycle === "monthly" ? 
      { amount: "149", period: "monthly" } : 
      { amount: "1499", period: "annually" },
    premium: billingCycle === "monthly" ? 
      { amount: "199", period: "monthly" } : 
      { amount: "1999", period: "annually" }
  };

  return (
    <section
      id="pricing"
      className="w-full max-w-[1335px] flex flex-col items-center mt-[152px] max-md:max-w-full max-md:mt-10"
    >
      <div className="text-[rgba(233,138,35,1)] text-lg font-bold leading-none tracking-[1.8px] text-center uppercase">
        pricing
      </div>
      <h2 className="text-[#170F49] text-center text-[50px] font-bold leading-none mt-[26px] max-md:max-w-full max-md:text-[40px]">
        Simple, transparent pricing
      </h2>
      <p className="text-[#26393F] text-center text-lg font-normal leading-[30px] z-10 max-md:max-w-full">
        Lorem ipsum dolor sit amet consectetur adipiscing elit dolor posuere vel
        venenatis eu sit massa volutpat.
      </p>

      <div className="flex items-center gap-4 mt-8">
        <span className={`text-lg ${billingCycle === "monthly" ? "font-bold text-[#170F49]" : "text-[#6f6c90]"}`}>Monthly</span>
        <Switch 
          checked={billingCycle === "annually"} 
          onCheckedChange={toggleBillingCycle} 
          className="data-[state=checked]:bg-[rgba(233,138,35,1)]"
        />
        <span className={`text-lg ${billingCycle === "annually" ? "font-bold text-[#170F49]" : "text-[#6f6c90]"}`}>Annually</span>
      </div>

      <button className="bg-[rgba(245,246,251,1)] border w-[175px] max-w-full text-lg text-[rgba(7,15,24,1)] font-normal text-center mt-[46px] p-[19px] rounded-[56px] border-[rgba(233,138,35,1)] border-solid max-md:mt-10 hover:bg-[rgba(245,246,251,0.8)] transition-colors">
        Compare Pricing
      </button>

      <div className="w-full max-w-[1242px] mt-[29px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {/* Light Plan */}
          <div className="w-[33%] max-md:w-full max-md:ml-0">
            <div className="border border-[color:var(--Neutral-300,#EFF0F6)] shadow-[0px_2px_12px_0px_rgba(20,20,43,0.08)] bg-white flex grow w-full mt-[46px] px-[3px] py-[55px] rounded-3xl border-solid max-md:mt-10">
              <div className="bg-[rgba(255,255,255,0.01)] flex w-10 shrink-0 h-[352px] mt-[174px] max-md:mt-10" />
              <div className="self-stretch flex flex-col">
                <div className="flex items-stretch gap-[18px]">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/acddc058243ca331b397e95b5e49c70eb9b8fc7c?placeholderIfAbsent=true"
                    alt="Light Plan Icon"
                    className="aspect-[1] object-contain w-[72px] shrink-0"
                  />
                  <div className="flex flex-col items-stretch my-auto">
                    <div className="text-[#26393F] text-lg font-medium leading-none">
                      For individuals
                    </div>
                    <div className="text-[#170F49] text-2xl font-bold leading-none">
                      Light
                    </div>
                  </div>
                </div>
                <p className="text-[#26393F] text-lg font-normal leading-[30px] self-stretch mt-[18px]">
                  Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                  adipiscing elit.
                </p>
                <div className="flex items-center gap-2.5 whitespace-nowrap mt-[13px]">
                  <div className="text-[#170F49] text-[54px] font-bold leading-none self-stretch my-auto max-md:text-[40px]">
                    ${pricing.light.amount}
                  </div>
                  <div className="self-stretch text-xl text-[#26393F] font-medium leading-[1.1] w-[86px] my-auto pt-5">
                    /{pricing.light.period}
                  </div>
                </div>
                <div className="text-[#170F49] text-lg font-bold leading-none mt-[17px]">
                  What's included
                </div>
                <div className="flex flex-col text-lg text-[#170F49] font-normal leading-none mt-6">
                  <div className="flex">
                    <div className="flex items-center gap-3.5">
                      <CheckIcon />
                      <div className="self-stretch my-auto">Upto 3 users</div>
                    </div>
                  </div>
                  <div className="flex whitespace-nowrap mt-4">
                    <div className="flex items-center gap-3.5">
                      <CheckIcon />
                      <div className="self-stretch my-auto">Scheduling</div>
                    </div>
                  </div>
                  <div className="self-stretch flex mt-4">
                    <div className="flex items-center gap-3.5">
                      <CheckIcon />
                      <div className="self-stretch my-auto">
                        QuickBooks Integration
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <div className="flex items-center gap-3.5">
                      <CheckIcon />
                      <div className="self-stretch my-auto">GPS Tracking</div>
                    </div>
                  </div>
                </div>
                <button className="self-stretch bg-[rgba(233,138,35,1)] min-w-60 w-full gap-1.5 flex-1 shrink basis-[0%] px-[38px] py-[26px] rounded-[96px] max-md:px-5 text-lg text-white font-bold text-center leading-none mt-[37px] hover:bg-[rgba(233,138,35,0.9)] transition-colors">
                  Get started
                </button>
              </div>
              <div className="bg-[rgba(255,255,255,0.01)] flex w-10 shrink-0 h-[352px] mt-[174px] max-md:mt-10" />
            </div>
          </div>

          {/* Standard Plan */}
          <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="border border-[color:var(--Neutral-300,#EFF0F6)] shadow-[0px_2px_12px_0px_rgba(20,20,43,0.08)] bg-white flex grow w-full mt-[46px] px-[3px] py-[55px] rounded-3xl border-solid max-md:mt-10">
              <div className="bg-[rgba(255,255,255,0.01)] flex w-10 shrink-0 h-[352px] mt-[174px] max-md:mt-10" />
              <div className="self-stretch flex flex-col">
                <div className="flex gap-[18px]">
                  <div className="bg-[#ECEBFF] flex w-[72px] shrink-0 h-[72px] rounded-2xl" />
                  <div className="mt-1.5">
                    <div className="text-[#26393F] text-lg font-medium leading-none">
                      For big companies
                    </div>
                    <div className="text-[#170F49] text-2xl font-bold leading-[35px]">
                      Standard
                      <br />
                    </div>
                  </div>
                </div>
                <p className="text-[#26393F] text-lg font-normal leading-[30px] self-stretch">
                  Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                  adipiscing elit.
                </p>
                <div className="flex items-stretch gap-[29px] whitespace-nowrap mt-[13px]">
                  <div className="text-[#170F49] text-[54px] font-bold leading-none basis-auto max-md:text-[40px]">
                    ${pricing.standard.amount}
                  </div>
                  <div className="text-[#26393F] text-xl font-medium leading-[1.1] mt-8">
                    /{pricing.standard.period}
                  </div>
                </div>
                <div className="text-[#170F49] text-lg font-bold leading-none mt-[17px]">
                  What's included
                </div>
                <div className="flex text-lg text-[#170F49] font-normal leading-none mt-6">
                  <div className="flex items-center gap-3.5">
                    <CheckIcon />
                    <div className="self-stretch my-auto">Upto 5 users</div>
                  </div>
                </div>
                <div className="flex text-lg text-[#170F49] font-normal leading-none mt-4">
                  <div className="flex items-center gap-3.5">
                    <CheckIcon />
                    <div className="self-stretch my-auto">Time Tracking</div>
                  </div>
                </div>
                <div className="flex text-lg text-[#170F49] font-normal leading-none mt-4">
                  <div className="flex items-center gap-3.5">
                    <CheckIcon />
                    <div className="self-stretch my-auto">
                      Online Service Booking
                    </div>
                  </div>
                </div>
                <div className="flex text-lg text-[#170F49] font-normal leading-none mt-4">
                  <div className="flex items-center gap-3.5">
                    <CheckIcon />
                    <div className="self-stretch my-auto">Days off Planner</div>
                  </div>
                </div>
                <button className="self-stretch bg-[rgba(233,138,35,1)] min-w-60 w-full gap-1.5 flex-1 shrink basis-[0%] px-[38px] py-[26px] rounded-[96px] max-md:px-5 text-lg text-white font-bold text-center leading-none mt-[37px] hover:bg-[rgba(233,138,35,0.9)] transition-colors">
                  Get started
                </button>
              </div>
              <div className="bg-[rgba(255,255,255,0.01)] flex w-10 shrink-0 h-[352px] mt-[174px] max-md:mt-10" />
            </div>
          </div>

          {/* Premium Plan */}
          <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="border border-[color:var(--Neutral-300,#EFF0F6)] shadow-[0px_2px_12px_0px_rgba(20,20,43,0.08)] bg-[#E98A23] flex w-full flex-col items-center mx-auto px-[3px] py-7 rounded-3xl border-solid max-md:mt-[30px]">
              <div className="flex w-80 max-w-full gap-5 justify-between">
                <div className="bg-white flex w-[72px] shrink-0 h-[72px] mt-[18px] rounded-2xl" />
                <div className="self-stretch my-auto">
                  <div className="text-[#EFF0F6] text-center text-lg font-medium leading-none max-md:mr-0.5">
                    For startups
                  </div>
                  <div className="text-white text-2xl font-bold leading-none">
                    Premium
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.2)] text-sm text-white font-normal whitespace-nowrap leading-none px-6 py-3.5 rounded-[10px] max-md:px-5">
                  Popular
                </div>
              </div>
              <div className="self-stretch flex mt-[18px]">
                <div className="bg-[rgba(255,255,255,0.01)] flex w-10 shrink-0 h-[352px] mt-[84px] max-md:mt-10" />
                <div className="self-stretch flex flex-col">
                  <p className="text-[#D9DBE9] text-lg font-normal leading-[30px] self-stretch">
                    Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                    adipiscing elit.
                  </p>
                  <div className="flex items-center gap-2.5 whitespace-nowrap mt-[13px]">
                    <div className="text-white text-[54px] font-bold leading-none self-stretch my-auto max-md:text-[40px]">
                      ${pricing.premium.amount}
                    </div>
                    <div className="self-stretch text-xl text-[#D9DBE9] font-medium leading-[1.1] w-[87px] my-auto pt-5">
                      /{pricing.premium.period}
                    </div>
                  </div>
                  <div className="text-white text-lg font-bold leading-none mt-[17px]">
                    What's included
                  </div>
                  <div className="flex flex-col text-lg text-[#D9DBE9] font-normal leading-none mt-6">
                    <div className="flex">
                      <div className="flex items-center gap-3.5">
                        <CheckIcon color="#FFFFFF" />
                        <div className="self-stretch my-auto">
                          Upto 12 users
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex mt-4">
                      <div className="flex min-w-60 items-center gap-3.5">
                        <CheckIcon color="#FFFFFF" />
                        <div className="self-stretch my-auto">
                          Estimate Online Approvals
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-4">
                      <div className="flex items-center gap-3.5">
                        <CheckIcon color="#FFFFFF" />
                        <div className="self-stretch my-auto">
                          Smart Scheduling
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-4">
                      <div className="flex items-center gap-3.5">
                        <CheckIcon color="#FFFFFF" />
                        <div className="self-stretch my-auto">Customer Hub</div>
                      </div>
                    </div>
                  </div>
                  <button className="self-stretch bg-white min-w-60 w-full gap-1.5 flex-1 shrink basis-[0%] px-[38px] py-[26px] rounded-[96px] max-md:px-5 text-lg text-[#E98A23] font-bold text-center leading-none mt-[37px] hover:bg-[rgba(255,255,255,0.9)] transition-colors">
                    Get started
                  </button>
                </div>
                <div className="bg-[rgba(255,255,255,0.01)] flex w-10 shrink-0 h-[352px] mt-[84px] max-md:mt-10" />
              </div>
              <div className="flex w-[359px] max-w-full items-stretch gap-[5px] text-lg leading-none mt-[62px] max-md:mt-10">
                <div className="text-white font-semibold grow">*</div>
                <div className="flex text-white font-normal grow shrink basis-auto">
                  <div className="self-stretch min-w-60 gap-3.5">
                    All features of Standard plan are included
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
