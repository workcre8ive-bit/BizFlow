import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowLeft, Mail } from 'lucide-react';
import { Button, Input } from '../../components/ui/Base';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-500 w-8 h-8" />
            <span className="text-white font-bold text-2xl tracking-tighter">BizFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-slate-400 text-sm">Enter your email and we'll send you reset instructions.</p>
        </div>

        <div className="dark-glass p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="email"
                placeholder="name@company.com"
                className="pl-10 bg-slate-900/50 border-slate-800 text-white"
                required
              />
            </div>
          </div>

          <Button className="w-full h-12" variant="secondary">
            Send Reset Link
          </Button>

          <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
