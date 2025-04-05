export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-r-2 border-secondary rounded-full animate-spin animation-delay-400" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute inset-2 border-b-2 border-accent rounded-full animate-spin animation-delay-800"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 