import React, { useState } from 'react';
import { Heart, Star, User, Calendar, ArrowUpDown, Eye } from 'lucide-react';

export default function ItemCard({ item, onSelect, showOwner = true, onSwap, currentUser, isDark = false }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  const conditionColors = {
    excellent: isDark ? 'bg-green-600/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-200',
    good: isDark ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-200',
    fair: isDark ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200',
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleSwap = (e) => {
    e.stopPropagation();
    if (onSwap) {
      onSwap(item);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const isOwner = currentUser && currentUser.id === item.ownerId;

  return (
    <div className={`
      relative overflow-hidden cursor-pointer transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1
      ${isDark 
        ? 'bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm' 
        : 'bg-white/80 border border-gray-200/50 hover:border-gray-300/50 backdrop-blur-sm'
      }
    `} onClick={handleClick}>
      
      {/* Image container */}
      <div className="relative overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* Points badge */}
          <div className={`
            px-3 py-1 rounded-lg font-semibold text-sm backdrop-blur-sm
            ${isDark 
              ? 'bg-blue-600/80 text-blue-100 border border-blue-500/30' 
              : 'bg-blue-500/90 text-white border border-blue-400/30'
            }
          `}>
            <span>{item.pointsValue} pts</span>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            {/* Favorite button */}
            <button 
              onClick={handleLike}
              className={`
                p-2 rounded-lg shadow-md transition-all duration-300 backdrop-blur-sm
                ${isDark 
                  ? 'bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50' 
                  : 'bg-white/90 hover:bg-gray-50/90 border border-gray-200/50'
                }
              `}
            >
              <Heart className={`w-4 h-4 transition-colors duration-300 ${
                isLiked 
                  ? 'text-red-500 fill-red-500' 
                  : isDark ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
              }`} />
            </button>
            
            {/* Swap button (only if not owner) */}
            {!isOwner && (
              <button 
                onClick={handleSwap}
                className={`
                  p-2 rounded-lg shadow-md transition-all duration-300 backdrop-blur-sm
                  ${isDark 
                    ? 'bg-green-600/80 hover:bg-green-500/80 text-green-100 border border-green-500/30' 
                    : 'bg-green-500/90 hover:bg-green-600/90 text-white border border-green-400/30'
                  }
                `}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Condition badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`${conditionColors[item.condition]} px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm`}>
            {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and description */}
        <div className="space-y-2">
          <h3 className={`font-bold text-lg line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.title}
          </h3>
          <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {item.description}
          </p>
        </div>
        
        {/* Category and size */}
        <div className="flex items-center justify-between gap-2">
          <div className={`
            px-3 py-1 rounded-lg text-xs font-medium
            ${isDark 
              ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50' 
              : 'bg-gray-100/80 text-gray-700 border border-gray-200/50'
            }
          `}>
            <span>{item.category}</span>
          </div>
          <div className={`
            px-3 py-1 rounded-lg text-xs font-medium
            ${isDark 
              ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50' 
              : 'bg-gray-100/80 text-gray-700 border border-gray-200/50'
            }
          `}>
            <span>Size {item.size}</span>
          </div>
        </div>
        
        {/* Owner info */}
        {showOwner && (
          <div className={`
            flex items-center justify-between pt-3 border-t
            ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}
          `}>
            <div className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${isDark ? 'bg-blue-600' : 'bg-blue-500'}
              `}>
                <span className="text-white text-xs font-semibold">
                  {item.ownerName.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {item.ownerName}
                </span>
                {item.ownerRating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.ownerRating}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Calendar className="w-3 h-3" />
              <span className="text-xs">
                {new Date(item.dateUploaded).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
        
        {/* Action buttons in content */}
        <div className="flex space-x-2 pt-2">
          <button 
            onClick={handleClick}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${isDark 
                ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50' 
                : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 border border-gray-200/50'
              }
            `}
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
          
          {!isOwner && (
            <button 
              onClick={handleSwap}
              className={`
                flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${isDark 
                  ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/30' 
                  : 'bg-green-500 text-white hover:bg-green-600 border border-green-400'
                }
              `}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Swap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}