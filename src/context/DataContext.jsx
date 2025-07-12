import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext(undefined);

// Mock data for demonstration
const mockItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for any casual outfit.',
    category: 'Outerwear',
    size: 'M',
    condition: 'excellent',
    images: ['https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'],
    ownerId: '1',
    ownerName: 'Alex Green',
    pointsValue: 45,
    dateUploaded: '2024-01-20',
    status: 'available',
    tags: ['vintage', 'denim', 'casual'],
  },
  {
    id: '2',
    title: 'Elegant Evening Dress',
    description: 'Beautiful black evening dress, worn only once. Perfect for special occasions.',
    category: 'Dresses',
    size: 'S',
    condition: 'excellent',
    images: ['https://images.pexels.com/photos/1619651/pexels-photo-1619651.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'],
    ownerId: '2',
    ownerName: 'Sarah Johnson',
    pointsValue: 60,
    dateUploaded: '2024-01-18',
    status: 'available',
    tags: ['formal', 'evening', 'elegant'],
  },
  {
    id: '3',
    title: 'Casual Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in mint green. Great for everyday wear.',
    category: 'Tops',
    size: 'L',
    condition: 'good',
    images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'],
    ownerId: '1',
    ownerName: 'Alex Green',
    pointsValue: 25,
    dateUploaded: '2024-01-15',
    status: 'available',
    tags: ['casual', 'cotton', 'everyday'],
  },
  {
    id: '4',
    title: 'Designer Handbag',
    description: 'Authentic designer leather handbag. Minor wear but still in great condition.',
    category: 'Accessories',
    size: 'One Size',
    condition: 'good',
    images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'],
    ownerId: '2',
    ownerName: 'Sarah Johnson',
    pointsValue: 80,
    dateUploaded: '2024-01-12',
    status: 'available',
    tags: ['designer', 'leather', 'luxury'],
  },
];

export function DataProvider({ children }) {
  const [items, setItems] = useState(mockItems);
  const [swapRequests, setSwapRequests] = useState([]);
  const [redemptions, setRedemptions] = useState([]);

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      dateUploaded: new Date().toISOString().split('T')[0],
    };
    setItems(prev => [...prev, newItem]);
    
    // Show success notification
    const event = new CustomEvent('showNotification', {
      detail: { 
        type: 'success', 
        message: `"${newItem.title}" uploaded successfully!` 
      }
    });
    window.dispatchEvent(event);
  };

  // Save to localStorage whenever data changes
  React.useEffect(() => {
    localStorage.setItem('rewear_items', JSON.stringify(items));
  }, [items]);

  React.useEffect(() => {
    localStorage.setItem('rewear_swaps', JSON.stringify(swapRequests));
  }, [swapRequests]);

  React.useEffect(() => {
    localStorage.setItem('rewear_redemptions', JSON.stringify(redemptions));
  }, [redemptions]);

  const updateItem = (id, updates) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const createSwapRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString().split('T')[0],
    };
    setSwapRequests(prev => [...prev, newRequest]);
  };

  const updateSwapRequest = (id, status) => {
    setSwapRequests(prev => prev.map(request =>
      request.id === id ? { ...request, status } : request
    ));
  };

  const redeemItem = (userId, itemId, pointsSpent) => {
    const redemption = {
      id: Date.now().toString(),
      userId,
      itemId,
      pointsSpent,
      dateRedeemed: new Date().toISOString().split('T')[0],
    };
    setRedemptions(prev => [...prev, redemption]);
    updateItem(itemId, { status: 'redeemed' });
    
    // Show success notification
    const item = items.find(i => i.id === itemId);
    const event = new CustomEvent('showNotification', {
      detail: { 
        type: 'success', 
        message: `Successfully redeemed "${item?.title}" for ${pointsSpent} points!` 
      }
    });
    window.dispatchEvent(event);
  };

  const getUserItems = (userId) => {
    return items.filter(item => item.ownerId === userId);
  };

  const getUserRedemptions = (userId) => {
    return redemptions.filter(redemption => redemption.userId === userId);
  };

  const getAvailableItems = () => {
    return items.filter(item => item.status === 'available');
  };

  const value = {
    items,
    swapRequests,
    redemptions,
    addItem,
    updateItem,
    deleteItem,
    createSwapRequest,
    updateSwapRequest,
    redeemItem,
    getUserItems,
    getUserRedemptions,
    getAvailableItems,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}