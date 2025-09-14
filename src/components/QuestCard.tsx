import { Quest } from '../types';
import { useQuestsStore } from '../store/questsStore';

export default function QuestCard({ quest }: { quest: Quest }) {
  const complete = useQuestsStore(s => s.completeQuest);
  return (
    <div className="bg-white shadow p-4 rounded mb-2 flex justify-between items-center">
      <div>
        <div className="font-semibold">{quest.title}</div>
        <div className="text-xs text-gray-500">{quest.description}</div>
      </div>
      <button
        aria-label="Valider la quête"
        className={`px-3 py-1 rounded ${quest.completed ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        disabled={quest.completed}
        onClick={() => complete(quest.id)}
      >
        {quest.completed ? 'Fait' : 'Valider'}
      </button>
    </div>
  );
}
