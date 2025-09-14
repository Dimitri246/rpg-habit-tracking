import { useShopStore } from '../store/shopStore';

interface Props {
  item: { id: string; name: string; cost: number; type: string };
}

export default function ShopItemCard({ item }: Props) {
  const purchase = useShopStore(s => s.purchase);
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <div className="font-semibold mb-2">{item.name}</div>
      <div className="text-sm text-gray-500 mb-2">{item.cost}g</div>
      <button
        aria-label="Acheter"
        className="px-3 py-1 bg-purple-500 text-white rounded"
        onClick={() => purchase(item.id)}
      >
        Acheter
      </button>
    </div>
  );
}
