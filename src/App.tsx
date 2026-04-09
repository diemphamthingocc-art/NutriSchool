/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import SetupForm from './components/SetupForm';
import MenuTable from './components/MenuTable';
import NutritionAnalysis from './components/NutritionAnalysis';
import GroceryList from './components/GroceryList';
import { AgeGroup, WeeklyMenu } from './types';
import { NUTRITION_STANDARDS } from './constants';
import { generateWeeklyMenu } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Info } from 'lucide-react';

export default function App() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('primary');
  const [studentCount, setStudentCount] = useState<number>(100);
  const [menu, setMenu] = useState<WeeklyMenu | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    console.log("handleGenerate called with:", { ageGroup, studentCount });
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateWeeklyMenu(ageGroup, studentCount);
      console.log("Menu generated successfully:", result);
      setMenu(result);
    } catch (err) {
      console.error("handleGenerate error:", err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi khởi tạo thực đơn. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SetupForm 
          ageGroup={ageGroup} 
          setAgeGroup={setAgeGroup}
          studentCount={studentCount}
          setStudentCount={setStudentCount}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-rose-50 border border-rose-100 p-4 rounded-xl mb-8 flex items-center gap-3 text-rose-700"
            >
              <Info className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {!menu && !isLoading && !error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-gray-400"
            >
              <ChefHat className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Vui lòng nhập thông tin để bắt đầu thiết lập thực đơn</p>
              <p className="text-sm">Hệ thống sẽ tự động tính toán dinh dưỡng và định lượng nguyên liệu</p>
            </motion.div>
          )}

          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-emerald-600 font-bold animate-pulse">Chuyên gia đang thiết kế thực đơn...</p>
            </motion.div>
          )}

          {menu && !isLoading && (
            <motion.div
              key="menu-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                  Thực đơn Tuần Khuyến nghị
                </h2>
                <div className="flex gap-2">
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {menu.studentCount} Suất ăn
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <MenuTable days={menu.days} />
                </div>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4" /> Tiêu chuẩn Auto-Quant
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500">Thịt / Cá</span>
                        <span className="text-sm font-bold text-gray-900">{NUTRITION_STANDARDS[menu.ageGroup].weights.meat_fish}g / hs</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500">Rau củ</span>
                        <span className="text-sm font-bold text-gray-900">{NUTRITION_STANDARDS[menu.ageGroup].weights.veg}g / hs</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500">Gạo / Tinh bột</span>
                        <span className="text-sm font-bold text-gray-900">{NUTRITION_STANDARDS[menu.ageGroup].weights.rice}g / hs</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500">Gia vị</span>
                        <span className="text-sm font-bold text-gray-900">{NUTRITION_STANDARDS[menu.ageGroup].weights.spice}g / hs</span>
                      </div>
                    </div>
                  </div>
                  <NutritionAnalysis days={menu.days} />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                Danh sách đi chợ (Supplier List)
              </h2>
              
              <GroceryList menu={menu} />

              <div className="mt-12 p-6 bg-gray-900 rounded-2xl text-white">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-emerald-400" />
                  Lời khuyên từ Chuyên gia
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div className="space-y-2">
                    <p>• <strong className="text-white">Đa dạng hóa:</strong> Thực đơn đã được thiết kế để không lặp lại món chính trong vòng 10 ngày.</p>
                    <p>• <strong className="text-white">An toàn thực phẩm:</strong> Luôn kiểm tra nguồn gốc nguyên liệu, đặc biệt là thủy hải sản và gia cầm.</p>
                  </div>
                  <div className="space-y-2">
                    <p>• <strong className="text-white">Phối hợp món:</strong> Các món chiên rán luôn đi kèm món luộc hoặc canh thanh đạm để cân bằng lipid.</p>
                    <p>• <strong className="text-white">Dị ứng:</strong> Hãy chú ý các nhãn cảnh báo dị ứng trên thực đơn để chuẩn bị suất ăn thay thế cho học sinh đặc biệt.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
