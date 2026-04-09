import { WeeklyMenu, IngredientCategory } from '../types';
import { ShoppingCart, Download, Beef, Fish, Leaf, Wheat, Zap, Package } from 'lucide-react';

interface GroceryListProps {
  menu: WeeklyMenu;
}

const CATEGORY_MAP: Record<IngredientCategory, { label: string, icon: any, color: string }> = {
  meat: { label: 'Thịt', icon: Beef, color: 'text-rose-600' },
  fish: { label: 'Thủy hải sản', icon: Fish, color: 'text-blue-600' },
  veg: { label: 'Rau củ quả', icon: Leaf, color: 'text-emerald-600' },
  rice: { label: 'Gạo / Tinh bột', icon: Wheat, color: 'text-amber-600' },
  spice: { label: 'Gia vị', icon: Zap, color: 'text-purple-600' },
  other: { label: 'Khác', icon: Package, color: 'text-gray-600' },
};

export default function GroceryList({ menu }: GroceryListProps) {
  // Aggregate ingredients
  const totals: Record<string, { amount: number, unit: string, category: IngredientCategory }> = {};

  menu.days.forEach(day => {
    [day.mainDish, day.sideDish, day.soup, day.dessert].forEach(dish => {
      dish.ingredients.forEach(ing => {
        const key = `${ing.name.toLowerCase()}_${ing.unit}`;
        if (!totals[key]) {
          totals[key] = { amount: 0, unit: ing.unit, category: ing.category || 'other' };
        }
        // Calculation: (Amount per person * count) + 5% waste
        const dailyTotal = (ing.amount * menu.studentCount) * 1.05;
        totals[key].amount += dailyTotal;
      });
    });
  });

  const grouped = Object.entries(totals).reduce((acc, [key, data]) => {
    const category = data.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push({ name: key.split('_')[0], ...data });
    return acc;
  }, {} as Record<IngredientCategory, any[]>);

  const formatAmount = (amount: number, unit: string) => {
    if (unit === 'gram' && amount >= 1000) {
      return `${(amount / 1000).toFixed(2)} kg`;
    }
    return `${Math.ceil(amount)} ${unit}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-900 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <ShoppingCart className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-sm tracking-widest uppercase">Danh sách đi chợ (Tổng hợp tuần)</h3>
        </div>
        <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
          <Download className="w-4 h-4" /> Xuất Excel
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(Object.keys(CATEGORY_MAP) as IngredientCategory[]).map(catKey => {
            const items = grouped[catKey];
            if (!items || items.length === 0) return null;
            const Config = CATEGORY_MAP[catKey];

            return (
              <div key={catKey} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-2">
                  <Config.icon className={`w-4 h-4 ${Config.color}`} />
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{Config.label}</h4>
                </div>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 group">
                      <span className="text-sm text-gray-600 capitalize group-hover:text-gray-900 transition-colors">{item.name}</span>
                      <span className="text-sm font-mono font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">
                        {formatAmount(item.amount, item.unit)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-700 font-medium">
            * Công thức tính (Auto-Quant): (Định mức x {menu.studentCount} học sinh) + 5% hao hụt sơ chế.
          </p>
        </div>
      </div>
    </div>
  );
}
