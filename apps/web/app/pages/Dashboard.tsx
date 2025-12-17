import React from "react";
import { PredictionResult } from "../page";
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

interface ResultsDisplayProps {
  result: PredictionResult;
  userName: string;
  onNewPrediction: () => void;
}

const Dashboard = ({
  result,
  userName,
  onNewPrediction,
}: ResultsDisplayProps) => {
    const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Very High':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case 'Low':
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case 'Moderate':
        return <AlertCircle className="w-16 h-16 text-yellow-600" />;
      case 'High':
        return <AlertTriangle className="w-16 h-16 text-orange-600" />;
      case 'Very High':
        return <XCircle className="w-16 h-16 text-red-600" />;
    }
  };

  const getPredictionIcon = () => {
    return result.isDiabetic ? (
      <XCircle className="w-12 h-12 text-red-600" />
    ) : (
      <CheckCircle className="w-12 h-12 text-green-600" />
    );
  };

  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Prediction Result */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-indigo-600 mb-4">Results for {userName}</h2>
          <div className="flex justify-center mb-4">{getPredictionIcon()}</div>
          <div className={`inline-block px-6 py-3 rounded-full ${result.isDiabetic ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {result.isDiabetic ? 'High Risk - Possible Diabetes' : 'Low Risk - No Diabetes Detected'}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Probability Score</p>
          <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${result.probability >= 70 ? 'bg-red-500' : result.probability >= 40 ? 'bg-yellow-500' : 'bg-green-500'} transition-all duration-1000`}
              style={{ width: `${result.probability}%` }}
            />
          </div>
          <p className="mt-2">{result.probability.toFixed(1)}%</p>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-8 h-8 text-indigo-600" />
          <h3 className="text-indigo-600">Risk Assessment</h3>
        </div>

        <div className={`border-2 rounded-xl p-6 mb-6 ${getRiskColor(result.riskLevel)}`}>
          <div className="flex items-center gap-4 mb-4">
            {getRiskIcon()}
            <div>
              <p className="opacity-75">Overall Risk Level</p>
              <p className="">{result.riskLevel} Risk</p>
            </div>
          </div>
        </div>

        {result.riskFactors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h4 className="text-gray-900">Identified Risk Factors</h4>
            </div>
            <ul className="space-y-3">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.riskFactors.length === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">No significant risk factors identified. Keep up the healthy lifestyle!</p>
          </div>
        )}
      </div>

      {/* Personalized Feedback */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8 text-indigo-600" />
          <h3 className="text-indigo-600">Personalized Feedback & Recommendations</h3>
        </div>

        <div className="space-y-4">
          {result.feedback.map((item, index) => (
            <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900">
            <strong>Disclaimer:</strong> This tool is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={onNewPrediction}
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          New Assessment
        </button>
      </div>
    </div>

  );
};

export default Dashboard;
