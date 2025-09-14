import { Link, NavLink } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import ProgressBar from './ProgressBar';
import { xpNeeded } from '../utils/xp';

export default function Header() {
  const player = useGameStore(s => s.player);
  const xpMax = xpNeeded(player.level);
  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-bold text-lg">Habit RPG</Link>
        <nav className="space-x-4">
          <NavLink to="/habits" className={({isActive})=>isActive?'text-blue-600':'text-gray-600'}>Habits</NavLink>
          <NavLink to="/quests" className={({isActive})=>isActive?'text-blue-600':'text-gray-600'}>Quests</NavLink>
          <NavLink to="/shop" className={({isActive})=>isActive?'text-blue-600':'text-gray-600'}>Shop</NavLink>
          <NavLink to="/profile" className={({isActive})=>isActive?'text-blue-600':'text-gray-600'}>Profile</NavLink>
        </nav>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-24">
            <ProgressBar label="XP" color="bg-blue-500" value={player.xp} max={xpMax} />
          </div>
          <div className="w-24">
            <ProgressBar label="HP" color="bg-red-500" value={player.hp} max={player.maxHp} />
          </div>
          <div className="font-semibold text-yellow-600">{player.gold}g</div>
        </div>
      </div>
    </header>
  );
}
