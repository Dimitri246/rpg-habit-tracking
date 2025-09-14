import create from 'zustand';
import { Habit, Difficulty, Frequency } from '../types';
import { load, save } from '../utils/storage';
import { todayKey } from '../utils/dates';
import { useGameStore } from './gameStore';

interface HabitsState {
  habits: Habit[];
  addHabit: (habit: { name: string; difficulty: Difficulty; frequency: Frequency; target?: string }) => void;
  updateHabit: (id: string, data: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleCompleteToday: (id: string) => void;
  resetDailyChecksIfNewDay: () => void;
}

const defaultHabits: Habit[] = [
  { id: 'h1', name: 'Boire 2L d\'eau', difficulty: 'Easy', frequency: 'Daily', createdAt: Date.now(), streak: 0 },
  { id: 'h2', name: 'Lire 10 pages', difficulty: 'Medium', frequency: 'Daily', createdAt: Date.now(), streak: 0 },
  { id: 'h3', name: 'Faire du sport', difficulty: 'Hard', frequency: 'Weekly', createdAt: Date.now(), streak: 0 },
];

export const useHabitsStore = create<HabitsState>((set, get) => ({
  habits: load<Habit[]>('habits', defaultHabits),
  addHabit(habit) {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      streak: 0,
    };
    const habits = [...get().habits, newHabit];
    set({ habits });
    save('habits', habits);
  },
  updateHabit(id, data) {
    const habits = get().habits.map(h => (h.id === id ? { ...h, ...data } : h));
    set({ habits });
    save('habits', habits);
  },
  deleteHabit(id) {
    const habits = get().habits.filter(h => h.id !== id);
    set({ habits });
    save('habits', habits);
  },
  toggleCompleteToday(id) {
    const key = todayKey();
    const habits = get().habits.map(h => {
      if (h.id !== id) return h;
      const lastKey = h.lastCompletedAt ? new Date(h.lastCompletedAt).toISOString().slice(0, 10) : undefined;
      if (lastKey === key) return h;
      const multiplier = h.difficulty === 'Easy' ? 1 : h.difficulty === 'Medium' ? 1.5 : 2;
      useGameStore.getState().gainXP(10 * multiplier);
      useGameStore.getState().gainGold(2);
      let streak = 1;
      if (lastKey) {
        const diff = Math.floor((Date.now() - h.lastCompletedAt!) / 86400000);
        streak = diff === 1 ? h.streak + 1 : 1;
      }
      return { ...h, lastCompletedAt: Date.now(), streak };
    });
    set({ habits });
    save('habits', habits);
  },
  resetDailyChecksIfNewDay() {
    const key = todayKey();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);
    const habits = get().habits.map(h => {
      const lastKey = h.lastCompletedAt ? new Date(h.lastCompletedAt).toISOString().slice(0, 10) : undefined;
      if (lastKey && lastKey !== key && lastKey !== yKey) {
        return { ...h, streak: 0 };
      }
      return h;
    });
    set({ habits });
    save('habits', habits);
  },
}));
