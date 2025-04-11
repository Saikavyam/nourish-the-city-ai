
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: number;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-sm border border-gray-100",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend !== undefined && (
            <div className={`flex items-center mt-1 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend >= 0 ? '+' : ''}{trend}%</span>
              <span className="ml-1">from last month</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        
        {icon && (
          <div className="rounded-lg bg-gray-50 p-2 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
