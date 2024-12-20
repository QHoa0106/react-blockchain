import React from "react";

interface OverviewCardProps {
  title: string;
  value: string;
  description: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-4xl font-extrabold mt-4">{value}</p>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
    </div>
  );
};

export default OverviewCard;
