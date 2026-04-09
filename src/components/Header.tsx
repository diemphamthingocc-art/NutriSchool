import { Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <Utensils className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">NutriSchool</h1>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Chuyên gia Dinh dưỡng & Quản lý Bếp ăn</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs font-mono text-gray-400">v1.0.0 | AI-Powered Nutrition</p>
        </div>
      </div>
    </header>
  );
}
