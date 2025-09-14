import { useShopStore } from '../store/shopStore';
import ShopItemCard from '../components/ShopItemCard';

export default function Shop() {
  const catalog = useShopStore(s => s.catalog);
  return (
    <div className="grid gap-4">
      {catalog.skins.map(item => <ShopItemCard key={item.id} item={item} />)}
      {catalog.boosts.map(item => <ShopItemCard key={item.id} item={item} />)}
    </div>
  );
}
