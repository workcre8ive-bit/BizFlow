import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Video,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Input } from '../components/ui/Base';
import { cn } from '../lib/utils';
import { format, addDays, startOfToday, eachDayOfInterval, endOfMonth, startOfMonth, isSameDay } from 'date-fns';

export default function Appointments() {
  const { appointments, customers, addAppointment } = useApp();
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppt, setNewAppt] = useState({
    customerId: '',
    title: '',
    startTime: '10:00',
    endTime: '11:00',
    date: format(startOfToday(), 'yyyy-MM-dd')
  });

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const appointmentsForSelectedDate = appointments.filter(appt => 
    isSameDay(new Date(appt.date), selectedDate)
  );

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      ...newAppt,
      date: format(selectedDate, 'yyyy-MM-dd')
    });
    setShowAddForm(false);
    setNewAppt({ customerId: '', title: '', startTime: '10:00', endTime: '11:00', date: format(selectedDate, 'yyyy-MM-dd') });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm">Schedule and manage meetings with your clients.</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar Side */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">{format(selectedDate, 'MMMM yyyy')}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, -30))}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 30))}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => {
              const hasAppts = appointments.some(a => isSameDay(new Date(a.date), day));
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, startOfToday());

              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all relative border",
                    isSelected ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : 
                    "bg-white border-slate-100 hover:border-blue-200 text-slate-700",
                    isToday && !isSelected && "border-blue-600/30 font-bold"
                  )}
                >
                  <span className="text-sm">{day.getDate()}</span>
                  {hasAppts && (
                    <div className={cn(
                      "w-1 h-1 rounded-full",
                      isSelected ? "bg-white" : "bg-blue-500"
                    )} />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Schedule Detail Side */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold">{format(selectedDate, 'EEEE, MMM do')}</h3>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
              {appointmentsForSelectedDate.length > 0 ? (
                appointmentsForSelectedDate.map((appt) => {
                  const customer = customers.find(c => c.id === appt.customerId);
                  return (
                    <div key={appt.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-white">{appt.title}</p>
                        <div className="flex items-center gap-1 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                          <Clock className="w-3 h-3" />
                          {appt.startTime}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <User className="w-3.5 h-3.5" />
                          {customer?.name}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Video className="w-3.5 h-3.5" />
                          Zoom / Virtual
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center">
                  <p className="text-slate-500 text-sm italic">Nothing on the schedule.</p>
                  <Button variant="ghost" size="sm" className="mt-4 text-white hover:bg-white/10" onClick={() => setShowAddForm(true)}>
                    Slot available +
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {showAddForm && (
            <Card className="border-2 border-emerald-100 bg-emerald-50/20">
              <h4 className="font-bold text-slate-900 mb-4 text-sm">Book on {format(selectedDate, 'MMM do')}</h4>
              <form onSubmit={handleBooking} className="space-y-4">
                <Input 
                  placeholder="Meeting Title" 
                  value={newAppt.title} 
                  onChange={e => setNewAppt({...newAppt, title: e.target.value})}
                  required 
                />
                <select 
                  className="w-full flex h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={newAppt.customerId}
                  onChange={e => setNewAppt({...newAppt, customerId: e.target.value})}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <div className="flex gap-2">
                  <Input 
                    type="time" 
                    value={newAppt.startTime}
                    onChange={e => setNewAppt({...newAppt, startTime: e.target.value})}
                    required 
                  />
                  <Input 
                    type="time" 
                    value={newAppt.endTime}
                    onChange={e => setNewAppt({...newAppt, endTime: e.target.value})}
                    required 
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="flex-1" size="sm">Book Slot</Button>
                  <Button variant="outline" type="button" size="sm" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
