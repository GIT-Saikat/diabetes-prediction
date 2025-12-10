import React from 'react'
import { ArrowRight,Shield,Heart,TrendingUp,Activity } from 'lucide-react'

const Hero = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full">
              AI-Powered Health Assessment
            </div>
            
            <h1 className="text-indigo-900">
              Know Your Diabetes Risk in Minutes
            </h1>
            
            <p className="text-gray-600 text-lg">
              Get a comprehensive diabetes risk assessment based on your health metrics. 
              Our intelligent system analyzes multiple factors to provide personalized insights 
              and actionable recommendations for better health.
            </p>

            <div className="space-y-4">
              <button
                // onClick={onCreateAccount}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
              >
                <span>Create New Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="h-px bg-gray-300 flex-1" />
                <span className="text-gray-500">or</span>
                <div className="h-px bg-gray-300 flex-1" />
              </div>

              <button
                // onClick={onSignIn}
                className="w-full sm:w-auto px-8 py-4 border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Sign In to Existing Account
              </button>
            </div>

            <p className="text-gray-500 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Your health data is private and secure
            </p>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Comprehensive Analysis</h3>
                  <p className="text-gray-600">
                    Evaluate multiple health factors including glucose, BMI, blood pressure, 
                    family history, and more for accurate risk assessment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Personalized Insights</h3>
                  <p className="text-gray-600">
                    Receive tailored recommendations and actionable feedback based on 
                    your unique health profile and risk factors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Risk Assessment</h3>
                  <p className="text-gray-600">
                    Get clear risk levels (Low, Moderate, High, Very High) with detailed 
                    explanations of factors contributing to your diabetes risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-indigo-600 mb-2">Quick Assessment</div>
            <p className="text-gray-600">Complete in under 5 minutes</p>
          </div>
          <div className="text-center">
            <div className="text-indigo-600 mb-2">Evidence-Based</div>
            <p className="text-gray-600">Built on medical research</p>
          </div>
          <div className="text-center">
            <div className="text-indigo-600 mb-2">Instant Results</div>
            <p className="text-gray-600">Get immediate feedback</p>
          </div>
        </div>
      </main>
  )
}

export default Hero