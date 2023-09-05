import React, { useContext } from "react";
import { v4 as uuid4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export const UNCATAGORIZED_ID = 'uncatagorized'

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budget", []);
  const [expenses, setExpenses] = useLocalStorage("expense", []);
  function getBudgetExpenses(budgetId) {
    // console.log(expenses.filter((expense) => expense.id === budgetId), budgetId);
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpenses({ amount, budgetId, description }) {
    return setExpenses((prevBudgets) => {
      return [...prevBudgets, { id: uuid4(), amount, budgetId, description }];
    });
  }
  function addBudget({ name, max }) {
    return setBudgets((prevBudgets) => {
      if (budgets.find((item) => item.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuid4(), name, max }];
    });
  }
  function deleteExpenses({ id }) {
    return setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    });
  }
  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      // console.log(prevExpenses);
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) {
          return expense;
        }
        return { ...expense, budgetId: UNCATAGORIZED_ID }
      })
    })
    console.log(id, expenses);
    return setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    });
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteExpenses,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
