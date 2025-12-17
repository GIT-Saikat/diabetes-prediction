import { useState } from "react";
import { HealthData, PredictionResult } from "../page";
import {
  Activity,
  User,
  Droplet,
  Heart,
  Ruler,
  Weight,
  Calendar,
  Users,
} from "lucide-react";

interface DiabetesPredictionFormProps {
  userName: string;
  onPrediction: (result: PredictionResult) => void;
}

export function DiabetesPredictionForm({
  userName,
  onPrediction,
}: DiabetesPredictionFormProps) {
  const [formData, setFormData] = useState<HealthData>({
    pregnancies: 0,
    glucose: 0,
    bloodPressure: 0,
    skinThickness: 0,
    insulin: 0,
    bmi: 0,
    age: 0,
    immediateFamilyHistory: "no",
    extendedFamilyHistory: "no",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: number): string => {
    switch (name) {
      case "pregnancies":
        if (value < 0 || value > 20)
          return "Pregnancies must be between 0 and 20";
        break;
      case "glucose":
        if (value < 40 || value > 400)
          return "Glucose must be between 40 and 400 mg/dL";
        break;
      case "bloodPressure":
        if (value < 40 || value > 140)
          return "Blood Pressure must be between 40 and 140 mm Hg";
        break;
      case "skinThickness":
        if (value < 5 || value > 100)
          return "Skin Thickness must be between 5 and 100 mm";
        break;
      case "insulin":
        if (value < 15 || value > 800)
          return "Insulin must be between 15 and 800 μU/mL";
        break;
      case "bmi":
        if (value < 15 || value > 70) return "BMI must be between 15 and 70";
        break;
      case "age":
        if (value < 21 || value > 100)
          return "Age must be between 21 and 100 years";
        break;
    }
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numValue = name.includes("Family") ? value : parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));

    if (!name.includes("Family")) {
      const error = validateField(name, numValue as number);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const calculatePrediction = (data: HealthData): PredictionResult => {
    let score = 0;
    const riskFactors: string[] = [];
    const feedback: string[] = [];

    // Glucose scoring (most important factor)
    if (data.glucose >= 140) {
      score += 35;
      riskFactors.push("High glucose levels");
      feedback.push(
        "Your glucose level is elevated. Consider consulting a healthcare provider for a glucose tolerance test."
      );
    } else if (data.glucose >= 100) {
      score += 20;
      riskFactors.push("Borderline glucose levels");
      feedback.push(
        "Your glucose is in the pre-diabetic range. Lifestyle modifications can help prevent progression."
      );
    } else if (data.glucose < 70) {
      feedback.push(
        "Your glucose level is low. Make sure you're eating regular, balanced meals."
      );
    }

    // BMI scoring
    if (data.bmi >= 30) {
      score += 20;
      riskFactors.push("Obesity (BMI ≥ 30)");
      feedback.push(
        "Your BMI indicates obesity, which is a significant risk factor. Aim for gradual weight loss through diet and exercise."
      );
    } else if (data.bmi >= 25) {
      score += 10;
      riskFactors.push("Overweight (BMI 25-29.9)");
      feedback.push(
        "You are in the overweight category. Maintaining a healthy weight can reduce your diabetes risk."
      );
    } else if (data.bmi >= 18.5) {
      feedback.push(
        "Your BMI is in the healthy range. Keep up with regular physical activity!"
      );
    }

    // Blood Pressure
    if (data.bloodPressure >= 90) {
      score += 15;
      riskFactors.push("High blood pressure");
      feedback.push(
        "Your blood pressure (diastolic) is elevated. This increases diabetes risk and cardiovascular complications."
      );
    } else if (data.bloodPressure >= 80) {
      score += 8;
      riskFactors.push("Borderline high blood pressure");
      feedback.push(
        "Your blood pressure is slightly elevated. Monitor it regularly and reduce sodium intake."
      );
    } else if (data.bloodPressure > 0) {
      feedback.push(
        "Your blood pressure is within normal range. Continue healthy lifestyle habits."
      );
    }

    // Age
    if (data.age >= 45) {
      score += 10;
      riskFactors.push("Age 45 or older");
    } else if (data.age >= 35) {
      score += 5;
    }

    // Family History
    if (data.immediateFamilyHistory === "yes") {
      score += 15;
      riskFactors.push("Immediate family history of diabetes");
      feedback.push(
        "Having a parent or sibling with diabetes increases your risk. Regular screening is important."
      );
    }
    if (data.extendedFamilyHistory === "yes") {
      score += 5;
      riskFactors.push("Extended family history of diabetes");
    }

    // Insulin
    if (data.insulin >= 200) {
      score += 10;
      riskFactors.push("High insulin levels");
      feedback.push(
        "Elevated insulin levels may indicate insulin resistance, a precursor to type 2 diabetes."
      );
    } else if (data.insulin > 0 && data.insulin < 50) {
      feedback.push("Your insulin levels appear to be in a healthy range.");
    }

    // Pregnancies (for women)
    if (data.pregnancies >= 3) {
      score += 8;
      riskFactors.push("Multiple pregnancies");
    }

    // Skin Thickness
    if (data.skinThickness > 40) {
      score += 5;
      riskFactors.push("Increased skin thickness");
    }

    // Determine risk level and prediction
    let riskLevel: "Low" | "Moderate" | "High" | "Very High";
    let isDiabetic: boolean;
    let probability: number;

    if (score >= 70) {
      riskLevel = "Very High";
      isDiabetic = true;
      probability = 85 + Math.min(score - 70, 15);
    } else if (score >= 50) {
      riskLevel = "High";
      isDiabetic = true;
      probability = 65 + (score - 50) * 0.5;
    } else if (score >= 30) {
      riskLevel = "Moderate";
      isDiabetic = false;
      probability = 35 + (score - 30) * 0.5;
    } else {
      riskLevel = "Low";
      isDiabetic = false;
      probability = Math.max(5, score);
    }

    // Add general feedback
    if (!isDiabetic && riskFactors.length === 0) {
      feedback.push(
        "Great job! Your current health metrics look good. Continue with a balanced diet and regular exercise."
      );
    }

    if (isDiabetic) {
      feedback.push(
        "Based on your inputs, you may be at risk for diabetes. Please consult with a healthcare provider for proper diagnosis and treatment."
      );
    }

    // General recommendations
    if (riskLevel !== "Low") {
      feedback.push(
        "Recommended actions: Get regular check-ups, maintain a healthy diet, exercise 150 minutes per week, and monitor your blood sugar."
      );
    }

    return {
      isDiabetic,
      probability: Math.min(probability, 99),
      riskLevel,
      riskFactors,
      feedback,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "immediateFamilyHistory" && key !== "extendedFamilyHistory") {
        const error = validateField(
          key,
          formData[key as keyof HealthData] as number
        );
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const result = calculatePrediction(formData);
      onPrediction(result);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-indigo-600 mb-2">Health Assessment</h2>
        <p className="text-gray-600">
          Hi {userName}, please provide your health information for diabetes
          risk assessment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pregnancies */}
          <div>
            <label
              htmlFor="pregnancies"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <User className="w-5 h-5 text-indigo-600" />
              Pregnancies
            </label>
            <input
              type="number"
              id="pregnancies"
              name="pregnancies"
              value={formData.pregnancies || ""}
              onChange={handleInputChange}
              min="0"
              max="20"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            {errors.pregnancies && (
              <p className="text-red-500 text-sm mt-1">{errors.pregnancies}</p>
            )}
          </div>

          {/* Glucose */}
          <div>
            <label
              htmlFor="glucose"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Droplet className="w-5 h-5 text-indigo-600" />
              Glucose (mg/dL)
            </label>
            <input
              type="number"
              id="glucose"
              name="glucose"
              value={formData.glucose || ""}
              onChange={handleInputChange}
              min="40"
              max="400"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            {errors.glucose && (
              <p className="text-red-500 text-sm mt-1">{errors.glucose}</p>
            )}
          </div>

          {/* Blood Pressure */}
          <div>
            <label
              htmlFor="bloodPressure"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Heart className="w-5 h-5 text-indigo-600" />
              Diastolic Blood Pressure (mm Hg)
            </label>
            <input
              type="number"
              id="bloodPressure"
              name="bloodPressure"
              value={formData.bloodPressure || ""}
              onChange={handleInputChange}
              min="40"
              max="140"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            {errors.bloodPressure && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bloodPressure}
              </p>
            )}
          </div>

          {/* Skin Thickness */}
          <div>
            <label
              htmlFor="skinThickness"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Ruler className="w-5 h-5 text-indigo-600" />
              Skin Thickness (mm)
            </label>
            <input
              type="number"
              id="skinThickness"
              name="skinThickness"
              value={formData.skinThickness || ""}
              onChange={handleInputChange}
              min="5"
              max="100"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            {errors.skinThickness && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skinThickness}
              </p>
            )}
          </div>

          {/* Insulin */}
          <div>
            <label
              htmlFor="insulin"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Activity className="w-5 h-5 text-indigo-600" />
              Insulin (μU/mL)
            </label>
            <input
              type="number"
              id="insulin"
              name="insulin"
              value={formData.insulin || ""}
              onChange={handleInputChange}
              min="15"
              max="800"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            {errors.insulin && (
              <p className="text-red-500 text-sm mt-1">{errors.insulin}</p>
            )}
          </div>

          {/* BMI */}
          <div>
            <label
              htmlFor="bmi"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Weight className="w-5 h-5 text-indigo-600" />
              BMI (Body Mass Index)
            </label>
            <input
              type="number"
              id="bmi"
              name="bmi"
              value={formData.bmi || ""}
              onChange={handleInputChange}
              min="15"
              max="70"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            {errors.bmi && (
              <p className="text-red-500 text-sm mt-1">{errors.bmi}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Calendar className="w-5 h-5 text-indigo-600" />
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age || ""}
              onChange={handleInputChange}
              min="21"
              max="100"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              required
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Immediate Family History */}
          <div>
            <label
              htmlFor="immediateFamilyHistory"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Users className="w-5 h-5 text-indigo-600" />
              Immediate Family History
            </label>
            <select
              id="immediateFamilyHistory"
              name="immediateFamilyHistory"
              value={formData.immediateFamilyHistory}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
              required
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            <p className="text-gray-500 mt-1">
              Parents or siblings with diabetes
            </p>
          </div>

          {/* Extended Family History */}
          <div>
            <label
              htmlFor="extendedFamilyHistory"
              className="flex items-center gap-2 text-gray-700 mb-2"
            >
              <Users className="w-5 h-5 text-indigo-600" />
              Extended Family History
            </label>
            <select
              id="extendedFamilyHistory"
              name="extendedFamilyHistory"
              value={formData.extendedFamilyHistory}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
              required
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            <p className="text-gray-500 mt-1">
              Grandparents, aunts, uncles with diabetes
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get Diabetes Prediction
        </button>
      </form>
    </div>
  );
}
