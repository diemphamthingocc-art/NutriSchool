import { Users, GraduationCap, ChevronDown } from 'lucide-react';
import { AgeGroup } from '../types';
import { NUTRITION_STANDARDS } from '../constants';

interface SetupFormProps {
  ageGroup: AgeGroup;
  setAgeGroup: (val: AgeGroup) => void;
  studentCount: number;
  setStudentCount: (val: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function SetupForm({ 
  ageGroup, 
  setAgeGroup, 
  studentCount, 
  setStudentCount, 
  onGenerate,
  isLoading 
}: SetupFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="relative">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Độ tuổi học sinh
          </label>
          <div className="relative">
            <select 
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none appearance-none cursor-pointer pr-10"
            >
              {Object.entries(NUTRITION_STANDARDS).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" /> Số lượng suất ăn
          </label>
          <input 
            type="number" 
            min="1"
            value={studentCount || ''}
            onChange={(e) => setStudentCount(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
            placeholder="Nhập số lượng..."
          />
        </div>

        <div>
          <button 
            onClick={onGenerate}
            disabled={isLoading || studentCount <= 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang thiết lập...
              </>
            ) : (
              'Thiết lập Thực đơn'
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Nhu cầu Calo</p>
          <p className="text-lg font-bold text-emerald-900">{NUTRITION_STANDARDS[ageGroup].calories[0]} - {NUTRITION_STANDARDS[ageGroup].calories[1]} kcal</p>
        </div>
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Tỷ lệ P-L-G</p>
          <p className="text-lg font-bold text-blue-900">13-20% | 20-30% | 55-65%</p>
        </div>
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Quy tắc đổi đạm</p>
          <p className="text-lg font-bold text-amber-900">Luân phiên 10 ngày</p>
        </div>
      </div>
    </div>
  );
}
