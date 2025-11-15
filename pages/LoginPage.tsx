import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PageBanner from '../components/PageBanner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="pt-20">
        <PageBanner 
            title="Admin Login"
            subtitle="Please enter your credentials to access the admin panel."
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-md mx-auto bg-light-bg p-8 rounded-lg shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-light-text mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                            placeholder="mohammadsalmansharif37@gmail.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-light-text mb-2">Password</label>
                         <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                            placeholder="Default: admin123"
                        />
                    </div>
                    
                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
