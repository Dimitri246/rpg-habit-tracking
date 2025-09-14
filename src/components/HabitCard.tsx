import { Habit } from '../types';
import { useHabitsStore } from '../store/habitsStore';

function formatLast(ts?: number) {
  if (!ts) return 'jamais';
  const diff = Math.floor((Date.now() - ts) / 86400000);
  if (diff === 0) return "aujourd'hui";
  if (diff === 1) return 'hier';
  return `il y a ${diff}j`;
}

export default function HabitCard({ habit }: { habit: Habit }) {
  const toggle = useHabitsStore(s => s.toggleCompleteToday);
  return (
    <div className="bg-white shadow p-4 rounded mb-2 flex justify-between items-center">
      <div>
        <div className="font-semibold">{habit.name}</div>
        <div className="text-xs text-gray-500">Streak: {habit.streak} – Dernier: {formatLast(habit.lastCompletedAt)}</div>
      </div>
      <button
        aria-label="Fait aujourd'hui"
        className="px-3 py-1 bg-green-500 text-white rounded"
        onClick={() => toggle(habit.id)}
      >
        Fait
      </button>
    </div>
  );
}
