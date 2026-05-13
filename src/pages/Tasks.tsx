import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'motion/react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Calendar, 
  Flag,
  Circle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, Button, Input } from '../components/ui/Base';
import { cn } from '../lib/utils';

export default function Tasks() {
  const { tasks, addTask, toggleTask } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as 'low'|'medium'|'high', deadline: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({ title: '', description: '', priority: 'medium', deadline: '' });
    setShowAdd(false);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Manager</h1>
          <p className="text-slate-500 text-sm">Focus on what matters. Track your daily operations.</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="rounded-full h-12 w-12 p-0">
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <Card className="border-2 border-slate-900 shadow-xl overflow-visible">
                <form onSubmit={handleAdd} className="space-y-6">
                  <div className="space-y-4">
                    <Input 
                      placeholder="What needs to be done?" 
                      className="text-lg font-medium border-none px-0 focus-visible:ring-0 shadow-none border-b border-slate-100 rounded-none h-14"
                      value={newTask.title}
                      onChange={e => setNewTask({...newTask, title: e.target.value})}
                      required
                    />
                    <textarea 
                      placeholder="Add a description (optional)"
                      className="w-full text-sm text-slate-600 bg-transparent resize-none outline-none min-h-[80px]"
                      value={newTask.description}
                      onChange={e => setNewTask({...newTask, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-100 pt-6">
                    <div className="flex gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Priority</label>
                        <select 
                          className="flex h-9 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs outline-none"
                          value={newTask.priority}
                          onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Deadline</label>
                        <Input 
                          type="date" 
                          className="h-9 text-xs px-3" 
                          value={newTask.deadline}
                          onChange={e => setNewTask({...newTask, deadline: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" type="button" onClick={() => setShowAdd(false)}>Cancel</Button>
                      <Button type="submit">Create Task</Button>
                    </div>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "group flex items-start gap-4 p-5 rounded-2xl border transition-all",
                task.completed ? "bg-slate-50 border-slate-100" : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md"
              )}
            >
              <button 
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  task.completed ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 group-hover:border-blue-400"
                )}
              >
                {task.completed && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className={cn(
                    "font-bold text-slate-900 transition-all",
                    task.completed && "text-slate-400 line-through decoration-slate-300"
                  )}>
                    {task.title}
                  </h3>
                  <div className={cn(
                    "px-2 py-0.5 rounded text-[9px] font-bold uppercase",
                    task.priority === 'high' ? "bg-red-50 text-red-600" :
                    task.priority === 'medium' ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-500"
                  )}>
                    {task.priority}
                  </div>
                </div>
                <p className={cn(
                  "text-sm leading-relaxed",
                  task.completed ? "text-slate-400" : "text-slate-600"
                )}>
                  {task.description}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                    <Calendar className="w-3 h-3" />
                    Due {task.deadline}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {tasks.length === 0 && (
            <div className="py-20 text-center">
              <CheckSquare className="mx-auto w-12 h-12 text-slate-100 mb-4" />
              <p className="text-slate-400">No tasks on your list yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
