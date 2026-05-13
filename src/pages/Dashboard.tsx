import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  Users, 
  FileText, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, Button } from '../components/ui/Base';
import { cn, formatCurrency } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

export default function Dashboard() {
  const { customers, invoices, appointments, tasks } = useApp();
  const navigate = useNavigate();

  // Generate real chart data from invoices for the last 6 months
  const chartData = Array.from({ length: 6 }).map((_, i) => {
    const monthDate = subMonths(new Date(), 5 - i);
    const monthName = format(monthDate, 'MMM');
    const monthlyRevenue = invoices
      .filter(inv => {
        const invDate = new Date(inv.createdAt);
        return inv.status === 'paid' && 
               isWithinInterval(invDate, { 
                 start: startOfMonth(monthDate), 
                 end: endOfMonth(monthDate) 
               });
      })
      .reduce((sum, inv) => sum + inv.amount, 0);

    return { name: monthName, revenue: monthlyRevenue };
  }).reverse();

  // Sort activities by date (descending)
  const recentInvoices = [...invoices].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const priorityTasks = [...tasks]
    .filter(t => !t.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - 
             priorityOrder[b.priority as keyof typeof priorityOrder];
    })
    .slice(0, 4);

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingInvoices = invoices.filter(inv => inv.status !== 'paid').length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;

  const recentCustomers = [...customers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const stats = [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, trend: 'Net Profit', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Invoices', value: pendingInvoices, icon: FileText, trend: `${invoices.filter(i => i.status === 'unpaid').length} Overdue`, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Customers', value: activeCustomers, icon: Users, trend: `${customers.length} Total`, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Appointments', value: appointments.length, icon: Calendar, trend: 'Updated', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Good Morning, Partner</h1>
          <p className="text-slate-500 text-xs md:text-sm">Here's what's happening with your business today.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => navigate('/appointments')}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none" onClick={() => navigate('/invoices')}>
            <Plus className="w-4 h-4 mr-2" />
            Invoice
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow h-full pb-4 md:pb-6">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-slate-400">{stat.trend}</span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] md:text-sm text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-2">
            <h3 className="font-bold text-slate-900 font-sans">Revenue Over Time</h3>
            <select className="text-xs md:text-sm border-none bg-slate-50 rounded-lg px-2 py-1 outline-none w-full sm:w-auto">
              <option>Last 6 months</option>
              <option>Year to date</option>
            </select>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  tickFormatter={(v) => `$${v}`}
                  width={40}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Task Quick List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 font-sans">Priority Tasks</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>View All</Button>
          </div>
          <div className="space-y-4">
            {priorityTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 group">
                <div className={cn(
                  "w-1.5 md:w-2 h-8 md:h-10 rounded-full shrink-0",
                  task.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs md:text-sm text-slate-900 truncate">{task.title}</p>
                  <div className="flex items-center text-[10px] text-slate-500 gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>Due {task.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
            {priorityTasks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400">All caught up!</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <Card>
          <h3 className="font-bold text-slate-900 mb-6 font-sans">Recent Transactions</h3>
          <div className="space-y-6">
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-slate-900">
                    <span className="font-semibold">{inv.status === 'paid' ? 'Payment' : 'New invoice'}</span> for {formatCurrency(inv.amount)}
                  </p>
                  <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{inv.createdAt}</p>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded text-[9px] md:text-[10px] font-bold uppercase shrink-0",
                  inv.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                )}>
                  {inv.status}
                </div>
              </div>
            ))}
            {recentInvoices.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No recent activity found.</p>
            )}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 font-sans">Recent Customers</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/customers')}>View All</Button>
          </div>
          <div className="space-y-6">
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs md:text-sm shrink-0">
                  {customer.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-slate-900 truncate">{customer.name}</p>
                  <p className="text-[10px] md:text-xs text-slate-500 truncate">{customer.company}</p>
                </div>
                <div className="text-[9px] md:text-[10px] text-slate-400 font-medium shrink-0">
                  {customer.createdAt}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
