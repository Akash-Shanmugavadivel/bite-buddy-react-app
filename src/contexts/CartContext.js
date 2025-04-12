
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  restaurant: null,
  totalAmount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // If trying to add from a different restaurant, clear cart first
      if (state.restaurant && state.restaurant.id !== action.payload.restaurant.id) {
        return {
          items: [{ ...action.payload.item, quantity: 1 }],
          restaurant: action.payload.restaurant,
          totalAmount: action.payload.item.price,
        };
      }

      const existingItem = state.items.find(item => item.id === action.payload.item.id);
      
      if (existingItem) {
        // Item exists, increase quantity
        const updatedItems = state.items.map(item => 
          item.id === action.payload.item.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          restaurant: action.payload.restaurant,
          totalAmount: state.totalAmount + action.payload.item.price
        };
      } else {
        // New item
        return {
          ...state,
          items: [...state.items, { ...action.payload.item, quantity: 1 }],
          restaurant: action.payload.restaurant,
          totalAmount: state.totalAmount + action.payload.item.price
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem.quantity === 1) {
        // Remove item completely
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        
        return {
          ...state,
          items: updatedItems,
          restaurant: updatedItems.length > 0 ? state.restaurant : null,
          totalAmount: state.totalAmount - existingItem.price
        };
      } else {
        // Decrease quantity
        const updatedItems = state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - existingItem.price
        };
      }
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  // Try to load cart from localStorage
  const savedCart = localStorage.getItem('cart');
  const [state, dispatch] = useReducer(cartReducer, savedCart ? JSON.parse(savedCart) : initialState);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  const addItem = (item, restaurant) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { item, restaurant } 
    });
  };
  
  const removeItem = (id) => {
    dispatch({ 
      type: 'REMOVE_ITEM', 
      payload: { id } 
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{ 
      cart: state, 
      addItem, 
      removeItem, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
