import { useState } from 'react';
import { Home, Clock, Activity, User, Settings, Search, Plus } from 'lucide-react';

export default function MacroMindApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [calorieTarget, setCalorieTarget] = useState(2207);
  const [currentCalories, setCurrentCalories] = useState(1450);
  
  // Calculate remaining calories and percentages
  const remainingCalories = calorieTarget - currentCalories;
  const caloriePercentage = Math.round((currentCalories / calorieTarget) * 100);
  
  // Define macro targets and current values
  const proteinTarget = 165;
  const carbTarget = 220;
  const fatTarget = 73;
  
  const currentProtein = 87;
  const currentCarbs = 130;
  const currentFat = 48;
  
  // Recent foods data
  const recentFoods = [
    { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Mixed Vegetables', calories: 70, protein: 2, carbs: 15, fat: 0 },
    { name: 'Protein Shake', calories: 120, protein: 24, carbs: 3, fat: 1 }
  ];
  
  // AI food recommendations
  const aiRecommendations = [
    { name: 'Greek Yogurt with Berries', calories: 180, protein: 15, carbs: 20, fat: 5 },
    { name: 'Salmon with Asparagus', calories: 320, protein: 28, carbs: 8, fat: 20 }
  ];
  
  // Render the appropriate screen based on active tab
  const renderScreen = () => {
    switch(activeTab) {
      case 'home':
        return <HomeScreen 
                 caloriePercentage={caloriePercentage}
                 currentCalories={currentCalories}
                 calorieTarget={calorieTarget}
                 remainingCalories={remainingCalories}
                 proteinTarget={proteinTarget}
                 carbTarget={carbTarget}
                 fatTarget={fatTarget}
                 currentProtein={currentProtein}
                 currentCarbs={currentCarbs}
                 currentFat={currentFat}
               />;
      case 'food':
        return <FoodScreen 
                 recentFoods={recentFoods}
                 aiRecommendations={aiRecommendations}
               />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">MacroMind</h1>
        <Settings className="text-gray-500 w-6 h-6" />
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-16">
        {renderScreen()}
      </main>
      
      {/* Navigation */}
      <nav className="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around items-center py-2">
          <NavButton 
            icon={<Home className={activeTab === 'home' ? "text-blue-500" : "text-gray-500"} />} 
            label="Home" 
            isActive={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <NavButton 
            icon={<Clock className={activeTab === 'food' ? "text-blue-500" : "text-gray-500"} />} 
            label="Food" 
            isActive={activeTab === 'food'}
            onClick={() => setActiveTab('food')}
          />
          <NavButton 
            icon={<Activity className={activeTab === 'activity' ? "text-blue-500" : "text-gray-500"} />} 
            label="Activity" 
            isActive={activeTab === 'activity'}
            onClick={() => setActiveTab('activity')}
          />
          <NavButton 
            icon={<User className={activeTab === 'profile' ? "text-blue-500" : "text-gray-500"} />} 
            label="Profile" 
            isActive={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </nav>
    </div>
  );
}

// Home Screen Component
function HomeScreen({ 
  caloriePercentage, 
  currentCalories, 
  calorieTarget, 
  remainingCalories,
  proteinTarget,
  carbTarget,
  fatTarget,
  currentProtein,
  currentCarbs,
  currentFat
}) {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Today's Progress</h2>
          <p className="text-gray-500">Apr 21, 2025</p>
        </div>
        
        {/* Progress Circle */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-2">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className="text-blue-500" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50" 
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - caloriePercentage / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{caloriePercentage}%</span>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-gray-500 mb-1">Calories</h3>
            <p className="text-2xl font-bold">{currentCalories} / {calorieTarget}</p>
            <p className="text-gray-500">Remaining: {remainingCalories}</p>
          </div>
        </div>
        
        {/* Macro Bars */}
        <div className="space-y-4">
          <MacroBar 
            label="Protein" 
            current={currentProtein} 
            target={proteinTarget} 
            color="bg-green-400"
          />
          <MacroBar 
            label="Carbs" 
            current={currentCarbs} 
            target={carbTarget} 
            color="bg-orange-400"
          />
          <MacroBar 
            label="Fat" 
            current={currentFat} 
            target={fatTarget} 
            color="bg-blue-400"
          />
        </div>
      </div>
      
      {/* Glucose Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">Glucose Level</h2>
        <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          <p>CGM data visualization would appear here</p>
        </div>
      </div>
    </div>
  );
}

// Food Screen Component
function FoodScreen({ recentFoods, aiRecommendations }) {
  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="bg-white rounded-full shadow-sm p-2 mb-6 flex items-center">
        <Search className="text-gray-400 w-5 h-5 ml-2" />
        <input 
          type="text" 
          placeholder="Search foods..." 
          className="flex-1 ml-2 outline-none text-gray-600"
        />
      </div>
      
      {/* Recent Foods */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Foods</h2>
        <div className="space-y-2">
          {recentFoods.map((food, index) => (
            <FoodItem key={index} food={food} />
          ))}
        </div>
      </div>
      
      {/* AI Recommendations */}
      <div>
        <h2 className="text-xl font-bold mb-4">AI Recommendations</h2>
        <p className="text-gray-600 mb-4">Based on your health profile and goals, we recommend these foods:</p>
        <div className="space-y-2">
          {aiRecommendations.map((food, index) => (
            <FoodItem key={index} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Profile Screen Component
function ProfileScreen() {
  return (
    <div className="p-4">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-500 w-8 h-8" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-gray-500">Premium Member</p>
          </div>
        </div>
        
        {/* User Stats */}
        <div className="border-t border-gray-200">
          <div className="flex justify-between py-4 border-b border-gray-200">
            <span className="text-gray-600">Goal</span>
            <span className="font-medium">Build Muscle</span>
          </div>
          <div className="flex justify-between py-4 border-b border-gray-200">
            <span className="text-gray-600">Daily Calorie Target</span>
            <span className="font-medium">2207 cal</span>
          </div>
          <div className="flex justify-between py-4 border-b border-gray-200">
            <span className="text-gray-600">Macro Split</span>
            <span className="font-medium">30P / 40C / 30F</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-gray-600">Connected Devices</span>
            <span className="font-medium text-blue-500">3 Active</span>
          </div>
        </div>
      </div>
      
      {/* Metabolic Adaptation */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Metabolic Adaptation</h2>
        <p className="text-gray-600 mb-6">
          Your metabolic rate is currently optimized. The Metabolic Adaptation Engine has adjusted your daily 
          calories based on your recent activity and weight trends.
        </p>
        <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
          <p>Metabolic trend chart would appear here</p>
        </div>
      </div>
    </div>
  );
}

// Macro Progress Bar Component
function MacroBar({ label, current, target, color }) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{current}/{target}g</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// Food Item Component
function FoodItem({ food }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{food.name}</h3>
        <p className="text-gray-500 text-sm">
          {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
        </p>
      </div>
      <button className="bg-blue-100 text-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}

// Navigation Button Component
function NavButton({ icon, label, isActive, onClick }) {
  return (
    <button 
      className="flex flex-col items-center justify-center px-4" 
      onClick={onClick}
    >
      {icon}
      <span className={`text-xs mt-1 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
        {label}
      </span>
    </button>
  );
}
