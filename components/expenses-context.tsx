import React, { createContext, useContext, useState } from 'react';

export type Expense = {
  id: string;
  description: string;
  amount: number;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (description: string, amount: number) => void;
  removeExpense: (id: string) => void;
  total: number;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function addExpense(description: string, amount: number) {
    const newItem: Expense = { id: Date.now().toString(), description, amount };
    setExpenses(prev => [newItem, ...prev]);
  }

  function removeExpense(id: string) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense, total }}>{children}</ExpensesContext.Provider>
  );
};

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpensesProvider');
  return ctx;
}
