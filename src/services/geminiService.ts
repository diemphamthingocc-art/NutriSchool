import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { AgeGroup, WeeklyMenu } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const MENU_SCHEMA = {
// ... (rest of the schema remains the same)
  type: Type.OBJECT,
  properties: {
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          mainDish: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.NUMBER },
                    unit: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ["meat", "fish", "veg", "rice", "spice", "other"] }
                  },
                  required: ["name", "amount", "unit", "category"]
                }
              },
              nutrition: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  lipid: { type: Type.NUMBER },
                  glucid: { type: Type.NUMBER }
                },
                required: ["calories", "protein", "lipid", "glucid"]
              },
              allergens: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "ingredients", "nutrition"]
          },
          sideDish: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.NUMBER },
                    unit: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ["meat", "fish", "veg", "rice", "spice", "other"] }
                  },
                  required: ["name", "amount", "unit", "category"]
                }
              },
              nutrition: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  lipid: { type: Type.NUMBER },
                  glucid: { type: Type.NUMBER }
                },
                required: ["calories", "protein", "lipid", "glucid"]
              },
              allergens: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "ingredients", "nutrition"]
          },
          soup: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.NUMBER },
                    unit: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ["meat", "fish", "veg", "rice", "spice", "other"] }
                  },
                  required: ["name", "amount", "unit", "category"]
                }
              },
              nutrition: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  lipid: { type: Type.NUMBER },
                  glucid: { type: Type.NUMBER }
                },
                required: ["calories", "protein", "lipid", "glucid"]
              },
              allergens: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "ingredients", "nutrition"]
          },
          dessert: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.NUMBER },
                    unit: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ["meat", "fish", "veg", "rice", "spice", "other"] }
                  },
                  required: ["name", "amount", "unit", "category"]
                }
              },
              nutrition: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  lipid: { type: Type.NUMBER },
                  glucid: { type: Type.NUMBER }
                },
                required: ["calories", "protein", "lipid", "glucid"]
              },
              allergens: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "ingredients", "nutrition"]
          },
          totalNutrition: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              lipid: { type: Type.NUMBER },
              glucid: { type: Type.NUMBER }
            },
            required: ["calories", "protein", "lipid", "glucid"]
          }
        },
        required: ["day", "mainDish", "sideDish", "soup", "dessert", "totalNutrition"]
      }
    }
  },
  required: ["days"]
};

export async function generateWeeklyMenu(ageGroup: AgeGroup, studentCount: number): Promise<WeeklyMenu> {
  console.log("Starting optimized menu generation for:", { ageGroup, studentCount });
  const ai = getAI();
  
  const prompt = `Thiết kế thực đơn tuần (Thứ 2-6) cho học sinh ${ageGroup} (${studentCount} hs).
  Định lượng (g/hs): Thịt/Cá: 50-120g, Rau: 100-250g, Gạo: 60-200g, Gia vị: 5-12g.
  Yêu cầu:
  1. Calo & P-L-G chuẩn (P:13-20%, L:20-30%, G:55-65%).
  2. Mỗi ngày: Mặn, Xào, Canh, Tráng miệng.
  3. Phối hợp: Mặn Chiên/Rán + Xào Luộc.
  4. Đổi đạm: Heo, Bò, Gà, Hải sản, Trứng/Đậu.
  5. Phân loại: meat, fish, veg, rice, spice, other.
  6. Ghi chú dị ứng (allergens) cho TẤT CẢ các món nếu có thành phần gây dị ứng (hải sản, đậu phộng, v.v.).
  Trả về JSON theo schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: MENU_SCHEMA as any,
        systemInstruction: "Bạn là chuyên gia dinh dưỡng học đường Việt Nam. Trả về JSON nhanh, chính xác, món ăn thuần Việt.",
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      }
    });

    console.log("AI Response received");

    if (!response.text) {
      throw new Error("AI không trả về nội dung.");
    }

    const cleanText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanText);
    
    return {
      ageGroup,
      studentCount,
      days: result.days
    };
  } catch (error) {
    console.error("Error in generateWeeklyMenu:", error);
    throw error;
  }
}
