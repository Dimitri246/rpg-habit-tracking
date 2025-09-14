import { useGameStore } from '../store/gameStore';
import { useHabitsStore } from '../store/habitsStore';
import StatCard from '../components/StatCard';
import { useState } from 'react';

export default function Profile() {
  const player = useGameStore(s => s.player);
  const setName = useGameStore(s => s.setName);
  const [name, setNameLocal] = useState(player.name);
  const habits = useHabitsStore(s => s.habits);

  const saveName = () => setName(name);
  const completedThisWeek = habits.filter(h => h.lastCompletedAt && (Date.now() - h.lastCompletedAt) / 86400000 < 7).length;
  const bestStreak = Math.max(0, ...habits.map(h => h.streak));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full" />
        <div>
          <input className="border p-2" value={name} onChange={e=>setNameLocal(e.target.value)} />
          <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={saveName}>Sauver</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Niveau" value={player.level} />
        <StatCard label="XP" value={player.xp} />
        <StatCard label="Gold" value={player.gold} />
        <StatCard label="HP" value={player.hp} />
        <StatCard label="Habits semaine" value={completedThisWeek} />
        <StatCard label="Meilleur streak" value={bestStreak} />
      </div>
    </div>
  );
}
