import create from 'zustand';
import { useGameStore } from './gameStore';

interface ShopItem {
  id: string;
  name: string;
  cost: number;
  type: 'skin' | 'boost';
}

interface ShopState {
  catalog: {
    skins: ShopItem[];
    boosts: ShopItem[];
  };
  canAfford: (cost: number) => boolean;
  purchase: (id: string) => void;
}

const skins: ShopItem[] = [
  { id: 'skin-forest', name: 'Forest Cloak', cost: 20, type: 'skin' },
  { id: 'skin-knight', name: 'Knight Armor', cost: 50, type: 'skin' },
  { id: 'skin-mystic', name: 'Mystic Pet', cost: 80, type: 'skin' },
];

const boosts: ShopItem[] = [
  { id: 'boost-xp', name: 'XP Boost (x1.5, 24h)', cost: 40, type: 'boost' },
];

export const useShopStore = create<ShopState>(() => ({
  catalog: { skins, boosts },
  canAfford(cost) {
    return useGameStore.getState().player.gold >= cost;
  },
  purchase(id) {
    const item = skins.concat(boosts).find(i => i.id === id);
    if (!item) return;
    if (item.type === 'skin') {
      useGameStore.getState().buySkin(item.name, item.cost);
    }
    if (item.type === 'boost') {
      useGameStore.getState().activateXpBoost();
    }
  },
}));
