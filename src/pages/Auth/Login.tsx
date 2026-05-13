import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Mail, Lock } from 'lucide-react';
import { Button, Input } from '../../components/ui/Base';
import { useApp } from '../../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-500 w-8 h-8" />
            <span className="text-white font-bold text-2xl tracking-tighter">BizFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Enter your credentials to access your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="dark-glass p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="email"
                placeholder="name@company.com"
                className="pl-10 bg-slate-900/50 border-slate-800 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Link to="/forgot-password" title="Forgot Password" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10 bg-slate-900/50 border-slate-800 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" variant="secondary" className="w-full h-12">
            Sign In to BizFlow
          </Button>

          <p className="text-center text-sm text-slate-500 pt-4">
            Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">Create one free</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
