import create from 'zustand';
import { Quest } from '../types';
import { load, save } from '../utils/storage';
import { todayKey, isNewDay } from '../utils/dates';
import { sampleSize } from '../utils/rng';
import { useGameStore } from './gameStore';

interface QuestTemplate {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const questPool: QuestTemplate[] = [
  { title: 'Boire 2L d\'eau', description: 'Reste hydraté', difficulty: 'Easy' },
  { title: 'Marcher 5 000 pas', description: 'Bouge un peu', difficulty: 'Medium' },
  { title: 'Lire 10 minutes', description: 'Ouvre un livre', difficulty: 'Easy' },
  { title: 'Méditer 5 minutes', description: 'Respire', difficulty: 'Easy' },
  { title: '20 squats', description: 'Renforce tes jambes', difficulty: 'Medium' },
  { title: '10 pompes', description: 'Renforce le haut du corps', difficulty: 'Medium' },
  { title: 'Ranger 10 minutes', description: 'Espace propre', difficulty: 'Easy' },
  { title: 'Écrire 3 gratitudes', description: 'Pensée positive', difficulty: 'Easy' },
  { title: 'Pas d\'écran 30 min avant dodo', description: 'Détends-toi', difficulty: 'Hard' },
  { title: '5 fruits & légumes', description: 'Mange sainement', difficulty: 'Medium' },
  { title: '10 minutes d\'apprentissage', description: 'Apprends quelque chose', difficulty: 'Easy' },
  { title: 'Appeler un proche', description: 'Reste connecté', difficulty: 'Easy' },
];

interface QuestsState {
  todayDateKey: string;
  questsToday: Quest[];
  rerollUsed: boolean;
  generateDailyQuests: () => void;
  rerollQuests: () => void;
  completeQuest: (id: string) => void;
  ensureDailyQuests: () => void;
}

const stored = load<{ todayDateKey: string; questsToday: Quest[]; rerollUsed: boolean }>('quests', {
  todayDateKey: todayKey(),
  questsToday: [],
  rerollUsed: false,
});

export const useQuestsStore = create<QuestsState>((set, get) => ({
  todayDateKey: stored.todayDateKey,
  questsToday: stored.questsToday,
  rerollUsed: stored.rerollUsed,
  generateDailyQuests() {
    const today = todayKey();
    const templates = sampleSize(questPool, 3);
    const quests = templates.map(t => ({
      id: crypto.randomUUID(),
      title: t.title,
      description: t.description,
      difficulty: t.difficulty,
      completed: false,
    }));
    set({ todayDateKey: today, questsToday: quests, rerollUsed: false });
    save('quests', { todayDateKey: today, questsToday: quests, rerollUsed: false });
  },
  rerollQuests() {
    if (get().rerollUsed) return;
    if (useGameStore.getState().spendGold(3)) {
      get().generateDailyQuests();
      set({ rerollUsed: true });
      const { todayDateKey, questsToday } = get();
      save('quests', { todayDateKey, questsToday, rerollUsed: true });
    }
  },
  completeQuest(id) {
    const quests = get().questsToday.map(q => {
      if (q.id !== id || q.completed) return q;
      const mult = q.difficulty === 'Easy' ? 1 : q.difficulty === 'Medium' ? 1.5 : 2;
      useGameStore.getState().gainXP(15 * mult);
      useGameStore.getState().gainGold(5);
      return { ...q, completed: true };
    });
    set({ questsToday: quests });
    save('quests', { todayDateKey: get().todayDateKey, questsToday: quests, rerollUsed: get().rerollUsed });
  },
  ensureDailyQuests() {
    if (isNewDay(get().todayDateKey)) {
      get().generateDailyQuests();
    }
  },
}));
