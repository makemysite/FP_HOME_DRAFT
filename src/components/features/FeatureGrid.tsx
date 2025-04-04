
import React from "react";
import FeatureCard from "./FeatureCard";

// Import icons from lucide-react
import {
  Smartphone,
  CircuitBoard,
  Clock,
  BarChart3,
  Calendar,
  CreditCard,
  Users,
  Headphones,
  ClipboardList,
  FileText,
  Database,
  UserRound
} from "lucide-react";

interface FeatureGridProps {
  className?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ className }) => {
  const features = [
    // Column 1
    {
      icon: Smartphone,
      title: "Mobile App",
      description:
        "Run your business from anywhere. Use key features on your smartphone to keep operations smooth while on the go.",
    },
    {
      icon: CircuitBoard,
      title: "Tools & Integrations",
      description:
        "Connect your field service data directly to QuickBooks & Xero. Make accounting & Payments easier with automatic updates to your records.",
    },
    {
      icon: Clock,
      title: "Time Card & GPS Tracking",
      description:
        "See where your team is and what they're doing in real-time. Ensure correct pay and plan better routes to save time.",
    },
    {
      icon: BarChart3,
      title: "Reports & Dashboard",
      description:
        "See how your business is doing at a glance. Use easy-to-read reports to make smart choices and boost your service quality and profits.",
    },
    // Column 2
    {
      icon: Calendar,
      title: "Scheduling & Dispatching",
      description:
        "Assign jobs smartly. Match the best technician to each task, boosting efficiency and making customers happier.",
    },
    {
      icon: CreditCard,
      title: "Invoicing & Payments",
      description:
        "Get paid faster with built-in invoicing. Create professional bills on-site and take payments right away.",
    },
    {
      icon: Users,
      title: "Team Management",
      description:
        "Help your team work better together. Assign tasks, check performance, and keep everyone talking to each other easily.",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description:
        "Get help when you need it from our friendly support team. Reach out by email or phone to get the most out of your field service software.",
    },
    // Column 3
    {
      icon: ClipboardList,
      title: "Work Orders",
      description:
        "Manage jobs easily with digital work orders. Keep track of progress, update job status, and save detailed records for every service call.",
    },
    {
      icon: FileText,
      title: "Estimates",
      description:
        "Create quick, accurate quotes to win more jobs. Turn approved estimates into work orders with a single click.",
    },
    {
      icon: Database,
      title: "Equipment Tracking",
      description:
        "Keep clear records of customer gear and assets. Log service history, track warranties, and plan regular check-ups to make equipment last longer.",
    },
    {
      icon: UserRound,
      title: "Manage Customers",
      description:
        "Improve client relationships with a handy customer database. Quickly find service history, preferences, and contact details.",
    },
  ];

  // Create groups of 4 features for each column
  const column1 = features.slice(0, 4);
  const column2 = features.slice(4, 8);
  const column3 = features.slice(8, 12);

  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 mt-[124px] max-w-[1243px] mx-auto px-4 max-md:mt-10 ${className}`}
    >
      <div className="flex flex-col space-y-8">
        {column1.map((feature, index) => (
          <FeatureCard
            key={`col1-${index}`}
            Icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <div className="flex flex-col space-y-8">
        {column2.map((feature, index) => (
          <FeatureCard
            key={`col2-${index}`}
            Icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <div className="flex flex-col space-y-8">
        {column3.map((feature, index) => (
          <FeatureCard
            key={`col3-${index}`}
            Icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
