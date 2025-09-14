import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useState } from 'react';

export default function Home() {
  const player = useGameStore(s => s.player);
  const setName = useGameStore(s => s.setName);
  const [temp, setTemp] = useState('');

  if (!player.name) {
    return (
      <div className="space-y-2">
        <p>Choisis un pseudo :</p>
        <input className="border p-2 w-full" value={temp} onChange={e=>setTemp(e.target.value)} />
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={()=>setName(temp)}>Valider</button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <Link to="/habits" className="bg-white shadow rounded p-4 text-center">Créer une habitude</Link>
      <Link to="/quests" className="bg-white shadow rounded p-4 text-center">Voir quêtes du jour</Link>
      <Link to="/shop" className="bg-white shadow rounded p-4 text-center">Boutique</Link>
    </div>
  );
}
