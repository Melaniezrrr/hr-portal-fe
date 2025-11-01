"use client";

// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/user.type';

// Define the context type
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for easier usage
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 