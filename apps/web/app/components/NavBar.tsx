import React from 'react'
import {Activity} from "lucide-react"

const NavBar = () => {
  return (
    <header className="px-4 sm:px-6 lg:px-8">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-indigo-600">DiabetesPredict</span>
          </div>
          <button
            // onClick={onSignIn}
            className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>
  )
}

export default NavBar