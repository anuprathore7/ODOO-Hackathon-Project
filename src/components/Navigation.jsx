// import React, { useState } from 'react';
// import { Menu, X, User, LogOut, Plus, Home, Search, Sun, Moon, Leaf, Star , Shirt } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';

// export default function Navigation({ currentPage, onPageChange }) {
//   const { user, logout } = useAuth();
//   const { isDark, toggleTheme } = useTheme();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navItems = [
//     { id: 'home', label: 'Home', icon: Home },
//     { id: 'browse', label: 'Browse', icon: Search },
//     { id: 'upload', label: 'Upload', icon: Plus },
//     { id: 'dashboard', label: 'Dashboard', icon: User },
//   ];

//   const handleLogout = () => {
//     logout();
//     onPageChange('home');
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
//       <div className="max-w-7xl mx-auto container-padding">
//         <div className="flex items-center justify-between nav-height">

//           {/* LEFT: Logo */}
//           <div className="flex items-center min-w-[180px]">
//             <div
//               onClick={() => onPageChange('home')}
//               className="flex items-center cursor-pointer group"
//             >
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300">
//                   {/* <Leaf className="w-5 h-5 text-white" /> */}
//                   <Shirt  className="w-5 h-5 text-white"/>
//                 </div>
//                 <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
//                   ReWear
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* CENTER: Navigation Links + Theme Toggle */}
//           <div className="hidden md:flex  flex-grow justify-center items-center space-x-2">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = currentPage === item.id;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => onPageChange(item.id)}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
//                     isActive
//                       ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md'
//                       : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                 </button>
//               );
//             })}

//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700"
//               aria-label="Toggle theme"
//             >
//               <div className="relative w-5 h-5">
//                 <Sun
//                   className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
//                     isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
//                   }`}
//                 />
//                 <Moon
//                   className={`absolute inset-0 w-5 h-5 text-blue-500 transition-all duration-300 ${
//                     isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
//                   }`}
//                 />
//               </div>
//             </button>
//           </div>

//           {/* RIGHT: User Info or Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-4 min-w-[220px] justify-end">
//             {user ? (
//               <div className="flex items-center space-x-3">
//                 <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-300">
//                   <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
//                     {user.name.charAt(0)}
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
//                     <div className="flex items-center space-x-1">
//                       <Star className="w-3 h-3 text-yellow-500" />
//                       <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{user.points} points</p>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   <span className="text-sm font-bold">Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => onPageChange('login')}
//                   className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-sm font-medium transition-colors duration-300"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => onPageChange('signup')}
//                   className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


                import React, { useState } from 'react';
import { Menu, X, User, LogOut, Plus, Home, Search, Sun, Moon, Leaf, Star, Shirt } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navigation({ currentPage, onPageChange }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse', icon: Search },
    { id: 'upload', label: 'Upload', icon: Plus },
    { id: 'dashboard', label: 'Dashboard', icon: User },
  ];

  const handleLogout = () => {
    logout();
    onPageChange('home');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 relative flex items-center">

        {/* LEFT: Logo */}
        <div className="flex items-center space-x-2 justify-start">
          <div
            onClick={() => onPageChange('home')}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-9 h-9 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              ReWear
            </span>
          </div>
        </div>

        {/* CENTER: Navigation Buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = currentPage === id;
            return (
              <button
                key={id}
                onClick={() => onPageChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700"
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5">
              <Sun
                className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                  isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <Moon
                className={`absolute inset-0 w-5 h-5 text-blue-500 transition-all duration-300 ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}
              />
            </div>
          </button>
        </div>

        {/* RIGHT: User Info or Auth */}
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-300">
                <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{user.points} points</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-bold">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onPageChange('login')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-sm font-medium transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => onPageChange('signup')}
                className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
