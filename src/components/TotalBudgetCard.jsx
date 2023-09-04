// import React from 'react'

import BudgetCard from "./BudgetCard"
import { useBudgets } from '../context/BudgetContext'



function TotalBudgetCard(props) {
    const { budgets, expenses } = useBudgets()
    const max = budgets.reduce((acc, budget) => acc + budget.max, 0)
    const amount = expenses.reduce((acc, expense) => acc + expense.amount, 0)


    return (
        <BudgetCard name="Total" amount={amount} max={max} {...props} buttonActive />
    )
}

export default TotalBudgetCard