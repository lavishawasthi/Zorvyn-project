import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-9xl font-black text-gray-800/50">404</h1>
      <div className="absolute flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">Lost in the numbers?</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved to a restricted vault.
        </p>
        <Button onClick={() => navigate('/')} className="px-8">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}