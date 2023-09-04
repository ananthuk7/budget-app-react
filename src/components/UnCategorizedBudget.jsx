// import React from 'react'

import BudgetCard from "./BudgetCard"
import { useBudgets, UNCATAGORIZED_ID } from '../context/BudgetContext'



function UnCategorizedBudget(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATAGORIZED_ID).reduce((acc, expense) => acc + expense.amount, 0)

    return (
        <BudgetCard name="Uncategorized Budget" amount={amount} {...props} />
    )
}

export default UnCategorizedBudget