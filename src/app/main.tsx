import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import '../styles/index.css';
import { useGameStore } from '../store/gameStore';
import { useHabitsStore } from '../store/habitsStore';
import { useQuestsStore } from '../store/questsStore';

function Init() {
  const dailyDecayIfIdle = useGameStore(s => s.dailyDecayIfIdle);
  const resetHabits = useHabitsStore(s => s.resetDailyChecksIfNewDay);
  const ensureQuests = useQuestsStore(s => s.ensureDailyQuests);

  React.useEffect(() => {
    dailyDecayIfIdle();
    resetHabits();
    ensureQuests();
  }, [dailyDecayIfIdle, resetHabits, ensureQuests]);

  return <Router />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Init />
    </BrowserRouter>
  </React.StrictMode>,
);
