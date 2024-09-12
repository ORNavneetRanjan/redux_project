import { ImSpinner } from "react-icons/im";

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <ImSpinner className={`animate-spin ${className} text-5xl text-black`} />
    </div>
  );
};

export default LoadingSpinner;
