
import * as React from 'react';
import { cn } from '../../lib/utils';

interface AlertProps {
  className?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ className, children }) => (
  <div className={cn('border-l-4 p-4', className)}>
    {children}
  </div>
);

const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-bold">{children}</h3>
);

const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p>{children}</p>
);

export { Alert, AlertTitle, AlertDescription };
