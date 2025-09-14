export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Frequency = 'Daily' | 'Weekly';

export interface Habit {
  id: string;
  name: string;
  category?: string;
  difficulty: Difficulty;
  frequency: Frequency;
  target?: string;
  createdAt: number;
  lastCompletedAt?: number;
  streak: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  completed: boolean;
}

export interface Player {
  name: string;
  level: number;
  xp: number;
  gold: number;
  hp: number;
  maxHp: number;
  skin?: string;
  boosts?: {
    xp?: { activeUntil?: number };
  };
}
