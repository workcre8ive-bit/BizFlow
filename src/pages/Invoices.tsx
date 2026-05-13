import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileDown,
  Mail
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Input } from '../components/ui/Base';
import { cn, formatCurrency } from '../lib/utils';

export default function Invoices() {
  const { invoices, customers, addInvoice } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newInvoice, setNewInvoice] = useState({
    customerId: '',
    amount: '',
    dueDate: '',
    status: 'pending' as const
  });

  const filteredInvoices = invoices.filter(inv => {
    const customer = customers.find(c => c.id === inv.customerId);
    const searchMatch = customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    return searchMatch;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addInvoice({
      customerId: newInvoice.customerId,
      amount: parseFloat(newInvoice.amount),
      status: newInvoice.status,
      dueDate: newInvoice.dueDate
    });
    setShowAddForm(false);
    setNewInvoice({ customerId: '', amount: '', dueDate: '', status: 'pending' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'unpaid': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 font-sans">Invoices</h1>
          <p className="text-slate-500 text-xs md:text-sm">Create and manage professional invoices for your clients.</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="flex items-center gap-4 border-l-4 border-l-blue-500 p-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans truncate">Total Issued</p>
            <p className="text-lg md:text-2xl font-bold text-slate-900 truncate">{formatCurrency(invoices.reduce((s, i) => s + i.amount, 0))}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-l-4 border-l-emerald-500 p-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans truncate">Paid Amount</p>
            <p className="text-lg md:text-2xl font-bold text-slate-900 truncate">{formatCurrency(invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0))}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 border-l-4 border-l-orange-500 p-4 sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
            <Clock className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans truncate">Outstanding</p>
            <p className="text-lg md:text-2xl font-bold text-slate-900 truncate">{formatCurrency(invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount, 0))}</p>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by ID or customer..." 
            className="pl-10 h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 h-10">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-2 border-blue-600 overflow-visible p-4 md:p-6">
              <form onSubmit={handleAdd} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-sans">Select Customer</label>
                    <select 
                      className="w-full flex h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                      value={newInvoice.customerId}
                      onChange={e => setNewInvoice({...newInvoice, customerId: e.target.value})}
                      required
                    >
                      <option value="">Choose a client...</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.company})</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-sans">Amount (USD)</label>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      value={newInvoice.amount}
                      onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-sans">Due Date</label>
                    <Input 
                      type="date" 
                      value={newInvoice.dueDate}
                      onChange={e => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" type="button" size="sm" onClick={() => setShowAddForm(false)}>Discard</Button>
                  <Button type="submit" size="sm">Generate Invoice</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[850px] lg:min-w-0">
            <thead className="bg-slate-50 border-bottom border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredInvoices.map((inv) => {
                const customer = customers.find(c => c.id === inv.customerId);
                return (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-blue-600 truncate max-w-[120px]">{inv.id}</td>
                    <td className="px-6 py-4 min-w-[200px]">
                      <div className="font-semibold text-slate-900">{customer?.name}</div>
                      <div className="text-[10px] text-slate-400">{customer?.company}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{formatCurrency(inv.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                        inv.status === 'paid' ? "bg-emerald-50 text-emerald-600" : 
                        inv.status === 'unpaid' ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                      )}>
                        {getStatusIcon(inv.status)}
                        {inv.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{inv.dueDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download PDF">
                          <FileDown className="w-4 h-4 text-slate-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Send Email">
                          <Mail className="w-4 h-4 text-slate-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredInvoices.length === 0 && (
            <div className="py-12 md:py-20 text-center">
              <FileText className="mx-auto w-12 h-12 text-slate-200 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No invoices found</h3>
              <p className="text-slate-500 text-sm px-4">Create your first invoice to start getting paid.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
