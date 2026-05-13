export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'pending';
  dueDate: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  completed: boolean;
}

export interface Appointment {
  id: string;
  customerId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const initialCustomers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john@techcorp.com', phone: '555-0101', company: 'TechCorp Solutions', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@designhub.io', phone: '555-0202', company: 'DesignHub', status: 'active', createdAt: '2024-02-10' },
  { id: '3', name: 'Michael Brown', email: 'michael@buildit.com', phone: '555-0303', company: 'BuildIt Construction', status: 'inactive', createdAt: '2024-03-05' },
];

export const initialInvoices: Invoice[] = [
  { id: 'INV-001', customerId: '1', amount: 1250.00, status: 'paid', dueDate: '2024-04-01', createdAt: '2024-03-15' },
  { id: 'INV-002', customerId: '2', amount: 3400.00, status: 'pending', dueDate: '2024-04-15', createdAt: '2024-03-20' },
  { id: 'INV-003', customerId: '1', amount: 450.00, status: 'unpaid', dueDate: '2024-04-10', createdAt: '2024-03-25' },
];

export const initialTasks: Task[] = [
  { id: '1', title: 'Prepare Q1 Report', description: 'Compile all financial data for the first quarter.', priority: 'high', deadline: '2024-04-05', completed: false },
  { id: '2', title: 'Client Onboarding', description: 'Call Sarah to finalize project scope.', priority: 'medium', deadline: '2024-04-02', completed: true },
];

export const initialAppointments: Appointment[] = [
  { id: '1', customerId: '1', title: 'Strategy Meeting', date: '2024-04-10', startTime: '10:00', endTime: '11:00' },
  { id: '2', customerId: '2', title: 'Design Review', date: '2024-04-12', startTime: '14:00', endTime: '15:30' },
];
