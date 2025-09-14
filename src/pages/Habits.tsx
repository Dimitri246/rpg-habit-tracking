import { useState } from 'react';
import { useHabitsStore } from '../store/habitsStore';
import HabitCard from '../components/HabitCard';
import EmptyState from '../components/EmptyState';
import { Difficulty, Frequency } from '../types';

export default function Habits() {
  const habits = useHabitsStore(s => s.habits);
  const addHabit = useHabitsStore(s => s.addHabit);
  const [form, setForm] = useState({ name: '', difficulty: 'Easy' as Difficulty, frequency: 'Daily' as Frequency, target: '' });

  const submit = () => {
    if (!form.name) return;
    addHabit({ name: form.name, difficulty: form.difficulty, frequency: form.frequency, target: form.target });
    setForm({ name: '', difficulty: 'Easy', frequency: 'Daily', target: '' });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Nouvelle habitude</h2>
        <input className="border p-2 w-full mb-2" placeholder="Nom" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <div className="flex space-x-2 mb-2">
          <select className="border p-2" value={form.difficulty} onChange={e=>setForm({...form, difficulty:e.target.value as Difficulty})}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select className="border p-2" value={form.frequency} onChange={e=>setForm({...form, frequency:e.target.value as Frequency})}>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </div>
        <input className="border p-2 w-full mb-2" placeholder="Cible (optionnel)" value={form.target} onChange={e=>setForm({...form, target:e.target.value})} />
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={submit}>Ajouter</button>
      </div>
      {habits.length === 0 ? <EmptyState message="Pas d'habitudes" /> : habits.map(h => <HabitCard key={h.id} habit={h} />)}
    </div>
  );
}
