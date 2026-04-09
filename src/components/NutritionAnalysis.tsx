import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DailyMenu } from '../types';

interface NutritionAnalysisProps {
  days: DailyMenu[];
}

export default function NutritionAnalysis({ days }: NutritionAnalysisProps) {
  // Average nutrition across the week
  const avg = days.reduce((acc, day) => ({
    protein: acc.protein + day.totalNutrition.protein,
    lipid: acc.lipid + day.totalNutrition.lipid,
    glucid: acc.glucid + day.totalNutrition.glucid,
    calories: acc.calories + day.totalNutrition.calories,
  }), { protein: 0, lipid: 0, glucid: 0, calories: 0 });

  const count = days.length;
  const avgProtein = (avg.protein * 4) / avg.calories; // 1g P = 4 kcal
  const avgLipid = (avg.lipid * 9) / avg.calories;    // 1g L = 9 kcal
  const avgGlucid = (avg.glucid * 4) / avg.calories;   // 1g G = 4 kcal

  const pieData = [
    { name: 'Protein (Đạm)', value: avgProtein, color: '#E11D48' },
    { name: 'Lipid (Béo)', value: avgLipid, color: '#F59E0B' },
    { name: 'Glucid (Đường bột)', value: avgGlucid, color: '#10B981' },
  ];

  const barData = days.map(day => ({
    name: day.day,
    calories: day.totalNutrition.calories
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Phân bổ Năng lượng (P-L-G)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Biểu đồ Calo theo ngày</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="calories" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
