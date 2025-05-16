import { FC } from 'react';

interface SubjectCardProps {
  title: string;
  description?: string;
  // Add other props as needed
}

export const SubjectCard: FC<SubjectCardProps> = ({ title, description }) => {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </div>
  );
};

export default SubjectCard;