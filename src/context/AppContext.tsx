import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Customer, Invoice, Task, Appointment, 
  initialCustomers, initialInvoices, initialTasks, initialAppointments 
} from '../lib/mockData';

interface AppContextType {
  customers: Customer[];
  invoices: Invoice[];
  tasks: Task[];
  appointments: Appointment[];
  user: { name: string; email: string } | null;
  login: (email: string) => void;
  logout: () => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('bizflow_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('bizflow_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('bizflow_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('bizflow_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('bizflow_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('bizflow_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('bizflow_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('bizflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('bizflow_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('bizflow_user', JSON.stringify(user));
  }, [user]);

  const login = (email: string) => {
    setUser({ name: 'Business Owner', email });
  };

  const logout = () => {
    setUser(null);
  };

  const addCustomer = (data: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const addInvoice = (data: Omit<Invoice, 'id' | 'createdAt'>) => {
    const newInvoice: Invoice = {
      ...data,
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setInvoices(prev => [...prev, newInvoice]);
  };

  const addTask = (data: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addAppointment = (data: Omit<Appointment, 'id'>) => {
    const newAppt: Appointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAppointments(prev => [...prev, newAppt]);
  };

  return (
    <AppContext.Provider value={{ 
      customers, invoices, tasks, appointments, user, login, logout,
      addCustomer, updateCustomer, deleteCustomer, addInvoice, addTask, toggleTask, addAppointment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
