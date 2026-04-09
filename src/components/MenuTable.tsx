import { DailyMenu } from '../types';
import { AlertCircle, ChevronRight, Beef, Leaf, Soup, Apple } from 'lucide-react';
import { motion } from 'motion/react';

interface MenuTableProps {
  days: DailyMenu[];
}

export default function MenuTable({ days }: MenuTableProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
      {days.map((day, idx) => (
        <motion.div 
          key={day.day}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="bg-gray-900 py-3 px-4 flex items-center justify-between">
            <h3 className="text-white font-bold text-sm tracking-widest uppercase">{day.day}</h3>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          
          <div className="p-4 flex-grow space-y-5">
            <Section icon={Beef} label="Mặn" value={day.mainDish.name} color="text-rose-600" bgColor="bg-rose-50" />
            <Section icon={Leaf} label="Xào" value={day.sideDish.name} color="text-emerald-600" bgColor="bg-emerald-50" />
            <Section icon={Soup} label="Canh" value={day.soup.name} color="text-blue-600" bgColor="bg-blue-50" />
            <Section icon={Apple} label="Tráng miệng" value={day.dessert.name} color="text-amber-600" bgColor="bg-amber-50" />

            {(() => {
              const allAllergens = [
                ...(day.mainDish.allergens || []),
                ...(day.sideDish.allergens || []),
                ...(day.soup.allergens || []),
                ...(day.dessert.allergens || [])
              ].filter((v, i, a) => a.indexOf(v) === i); // Unique allergens

              if (allAllergens.length > 0) {
                return (
                  <div className="mt-4 p-2 bg-amber-50 rounded-lg flex items-start gap-2 border border-amber-100">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-700 font-bold uppercase tracking-tighter">
                      Dị ứng: {allAllergens.join(', ')}
                    </p>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Năng lượng</span>
              <span className="text-gray-900">{day.totalNutrition.calories} kcal</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Section({ icon: Icon, label, value, color, bgColor }: { icon: any, label: string, value: string, color: string, bgColor: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`${bgColor} p-2 rounded-lg shrink-0`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
      </div>
    </div>
  );
}
