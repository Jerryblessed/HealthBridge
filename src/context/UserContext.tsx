import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

// Mock user data - in a real app, this would come from authentication
const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  preferences: {
    language: 'en',
    notifications: true,
    accessibility: {
      highContrast: false,
      fontSize: 'medium',
      reduceMotion: false,
    },
  },
};

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => void;
  updateAccessibilityPreference: <K extends keyof User['preferences']['accessibility']>(
    key: K,
    value: User['preferences']['accessibility'][K]
  ) => void;
  setLanguage: (language: string) => void;
}

// const UserContext = createContext<UserContextType>({
//   }
//   user: null,
//   isLoading: true,
//   updateUser: () => {},
//   updateAccessibilityPreference: () => {},
//   setLanguage: () => {},
// });

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  updateUser: () => {},
  updateAccessibilityPreference: () => {},
  setLanguage: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setUser(mockUser);
        setIsLoading(false);
      }, 1000);
    };

    fetchUser();
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const updateAccessibilityPreference = <K extends keyof User['preferences']['accessibility']>(
    key: K,
    value: User['preferences']['accessibility'][K]
  ) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          accessibility: {
            ...user.preferences.accessibility,
            [key]: value,
          },
        },
      });
    }
  };

  const setLanguage = (language: string) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          language,
        },
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        updateUser,
        updateAccessibilityPreference,
        setLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
