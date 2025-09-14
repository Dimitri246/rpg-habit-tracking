import { useQuestsStore } from '../store/questsStore';
import QuestCard from '../components/QuestCard';
import EmptyState from '../components/EmptyState';

export default function Quests() {
  const quests = useQuestsStore(s => s.questsToday);
  const reroll = useQuestsStore(s => s.rerollQuests);
  const rerollUsed = useQuestsStore(s => s.rerollUsed);

  return (
    <div className="space-y-4">
      <button
        aria-label="Reroll"
        className="px-3 py-1 bg-yellow-500 text-white rounded"
        onClick={reroll}
        disabled={rerollUsed}
      >
        Reroll (3g)
      </button>
      {quests.length === 0 ? <EmptyState message="Pas de quêtes" /> : quests.map(q => <QuestCard key={q.id} quest={q} />)}
    </div>
  );
}
