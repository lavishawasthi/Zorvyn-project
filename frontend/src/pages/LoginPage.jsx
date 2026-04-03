import Button from '../components/ui/Button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-surface border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Finance.io
          </h1>
          <p className="text-gray-400">Enter your credentials to access the portal</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
            <input type="email" className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="admin@finance.io" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input type="password" className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="••••••••" />
          </div>
          <Button className="w-full py-4 text-lg">Sign In</Button>
        </form>
      </div>
    </div>
  );
}