import '../styles/tasks.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';


const API = 'http://localhost:8000/tasks';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // filter state: 'all' | 'completed' | 'incomplete'
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (e) {
      setError('Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const trimmed = (title || '').trim();
    if (!trimmed) {
      toast.error('Title is required');
      return setError('Title is required');
    }

    // duplicate check
    const exists = tasks.some(t => (t.title || '').trim().toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      toast.error('this task is already there');
      
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API, { title: trimmed });
      setTasks(prev => [res.data, ...prev]);
      setTitle('');
      setError('');
      toast.success('Task added');
    } catch (e) {
      setError('Failed to add task');
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (task) => {
    const optimistic = tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t);
    setTasks(optimistic);
    try {
      await axios.patch(`${API}/${task.id}`, { completed: !task.completed });
      toast.success('Task updated');
    } catch (e) {
      setError('Failed to update task');
      toast.error('Failed to update task');
      await load();
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (e) {
      setError('Failed to delete');
      toast.error('Failed to delete');
    }
  };

  // start editing an existing task
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const saveEdit = async (taskId) => {
    const newTitle = (editingTitle || '').trim();
    if (!newTitle) {
      toast.error('Title cannot be empty');
      return setError('Title cannot be empty');
    }
    setLoading(true);
    try {
      const res = await axios.patch(`${API}/${taskId}`, { title: newTitle });
      setTasks(prev => prev.map(t => t.id === taskId ? res.data : t));
      toast.success('Task updated');
      cancelEdit();
    } catch (e) {
      setError('Failed to update task');
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // derive displayed tasks according to filter
  const displayedTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'completed') return !!t.completed;
    return !t.completed; // 'incomplete'
  });

  return (
    <div className="tasks-page">
      <Toaster position="top-right" />
      <h1>Tasks</h1>

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        <button className={filter === 'incomplete' ? 'active' : ''} onClick={() => setFilter('incomplete')}>Not completed</button>
      </div>

      <form onSubmit={addTask} className="task-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task title" />
        <button type="submit" disabled={loading}>Add</button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <ul className="task-list">
        {displayedTasks.map(t => (
          <li key={t.id} className={t.completed ? 'completed' : ''}>
            {editingId === t.id ? (
              <div className="edit-row">
                <input className="edit-input" value={editingTitle} onChange={e => setEditingTitle(e.target.value)} />
                <div className="edit-actions">
                  <button onClick={() => saveEdit(t.id)} disabled={loading}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <label>
                  <input type="checkbox" checked={t.completed} onChange={() => toggle(t)} />
                  <span>{t.title}</span>
                </label>
                <div className="row-actions">
                  <button className="edit" onClick={() => startEdit(t)}>Edit</button>
                  <button className="delete" onClick={() => remove(t.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}