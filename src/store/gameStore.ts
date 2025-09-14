import create from 'zustand';
import { Player } from '../types';
import { load, save } from '../utils/storage';
import { xpNeeded } from '../utils/xp';
import { todayKey, isNewDay } from '../utils/dates';

interface GameState {
  player: Player & { lastActive?: string };
  setName: (name: string) => void;
  gainXP: (amount: number) => void;
  gainGold: (amount: number) => void;
  takeDamage: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  buySkin: (skin: string, cost: number) => void;
  activateXpBoost: () => void;
  isXpBoostActive: () => boolean;
  dailyDecayIfIdle: () => void;
}

const defaultPlayer: Player & { lastActive?: string } = {
  name: 'Aventurier',
  level: 1,
  xp: 0,
  gold: 10,
  hp: 100,
  maxHp: 100,
  boosts: {},
  lastActive: todayKey(),
};

export const useGameStore = create<GameState>((set, get) => ({
  player: load<Player & { lastActive?: string }>('player', defaultPlayer),
  setName(name) {
    const player = { ...get().player, name };
    set({ player });
    save('player', player);
  },
  gainXP(amount) {
    const { player } = get();
    const boost = get().isXpBoostActive() ? 1.5 : 1;
    let newXp = player.xp + amount * boost;
    let level = player.level;
    let gold = player.gold;
    while (newXp >= xpNeeded(level)) {
      newXp -= xpNeeded(level);
      level += 1;
      gold += 10;
    }
    const updated = { ...player, xp: newXp, level, gold, lastActive: todayKey() };
    set({ player: updated });
    save('player', updated);
  },
  gainGold(amount) {
    const player = { ...get().player, gold: get().player.gold + amount, lastActive: todayKey() };
    set({ player });
    save('player', player);
  },
  takeDamage(amount) {
    const player = { ...get().player, hp: Math.max(0, get().player.hp - amount) };
    set({ player });
    save('player', player);
  },
  spendGold(amount) {
    const { player } = get();
    if (player.gold < amount) return false;
    const updated = { ...player, gold: player.gold - amount };
    set({ player: updated });
    save('player', updated);
    return true;
  },
  buySkin(skin, cost) {
    if (get().spendGold(cost)) {
      const player = { ...get().player, skin };
      set({ player });
      save('player', player);
    }
  },
  activateXpBoost() {
    if (get().spendGold(40)) {
      const until = Date.now() + 24 * 60 * 60 * 1000;
      const player = {
        ...get().player,
        boosts: { ...get().player.boosts, xp: { activeUntil: until } },
      };
      set({ player });
      save('player', player);
    }
  },
  isXpBoostActive() {
    const until = get().player.boosts?.xp?.activeUntil;
    return !!until && Date.now() < until;
  },
  dailyDecayIfIdle() {
    const { player } = get();
    if (isNewDay(player.lastActive)) {
      player.hp = Math.max(0, player.hp - 5);
      player.lastActive = todayKey();
      const updated = { ...player };
      set({ player: updated });
      save('player', updated);
    }
  },
}));
