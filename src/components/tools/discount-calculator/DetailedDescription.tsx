
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const DetailedDescription = () => {
  return (
    <div className="space-y-8 mt-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Plan Smarter Deals with This Free Discount Calculator</h2>
        <p className="text-gray-700">
          Want to offer better discounts and still make a solid profit? Use our Discount Calculator to find the sweet spot.
          Whether you're running a seasonal offer or trying to win a repeat customer, this free Discount Calculator helps you figure out:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>How much to reduce</li>
          <li>What your customer pays</li>
          <li>And most importantly, what you still earn</li>
        </ul>
        <p className="mt-4 text-gray-700">It works from your desk, the job site, or on the go - wherever you are.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Know Your Tool</h2>
        <p className="text-gray-700">
          Think of the Discount Calculator as your personal pricing sidekick.
          You type in your service price and discount (percent or fixed), and it instantly shows the final price your customer pays - and how much you're giving away.
          No need to second-guess your math or pricing. It's quick, reliable, and made for everyday field business decisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What You'll See:</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Price before discount</li>
          <li>Discount (percentage or fixed)</li>
          <li>Final customer price</li>
          <li>Total money saved</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Use the Discount Calculator</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Enter your service price and discount</li>
          <li>Choose percent or fixed amount</li>
          <li>Click "Calculate"</li>
          <li>Done - your price and savings show up instantly</li>
          <li>Need to change the offer? Hit "Reset"</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Key Terms (Explained Simply)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-[#E98A23] font-medium">Price Before Discount</h3>
            <p>Your original service price.</p>
          </div>
          <div>
            <h3 className="text-[#E98A23] font-medium">Discount</h3>
            <p>The amount or % off you're offering.</p>
          </div>
          <div>
            <h3 className="text-[#E98A23] font-medium">Price After Discount</h3>
            <p>What your customer ends up paying.</p>
          </div>
          <div>
            <h3 className="text-[#E98A23] font-medium">Type of Discount</h3>
            <p>Choose between percent off or a flat-rate discount.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Calculate Discounted Price (Quick Formula)</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Start with your full price</li>
          <li>Subtract the discount (fixed or % based)</li>
          <li>The result = what the customer pays</li>
        </ol>
        <Card className="mt-4">
          <CardContent className="pt-6">
            <p className="font-medium">Example:</p>
            <p>If your service is ₹2,000 and you offer a 10% discount, your customer pays ₹1,800.</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What's a Smart Discount Strategy?</h2>
        <p className="mb-4">Not all discounts are good for your business. Here's what to think through:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Know your costs first</li>
          <li>Use our profit margin calculator to find how low you can go</li>
          <li>Set a maximum discount you can afford</li>
          <li>Try bundling services instead of slashing prices</li>
          <li>Consider customer lifetime value before giving big deals</li>
          <li>Run limited-time offers to drive urgency</li>
          <li>Always track the results and adjust</li>
        </ul>
        <p className="mt-4">Your goal? Make the customer happy without hurting your bottom line.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Offer More Discounts Without Losing Profit - Thanks to Field Promax</h2>
        <p className="mb-4">Want to offer better deals without burning cash? Cut down your operating costs first.</p>
        <p className="mb-4">With Field Promax, you:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Save time with automated job scheduling</li>
          <li>Reduce paperwork and go digital</li>
          <li>Track inventory and field teams in real-time</li>
          <li>Cut admin costs and improve team output</li>
        </ul>
        <p className="mt-4">All this helps you earn more - so giving discounts doesn't cut into your profits.</p>
      </section>

      <section className="text-center">
        <p className="text-xl font-medium">Start using our free Discount Calculator today.</p>
        <p className="text-lg text-gray-700">Offer smart deals. Stay profitable. Win more customers.</p>
      </section>
    </div>
  );
};

export default DetailedDescription;
