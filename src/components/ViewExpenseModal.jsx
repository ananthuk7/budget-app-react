// import React from 'react'

import { Button, Modal, Stack } from "react-bootstrap"
import PropTypes from 'prop-types'
import { useBudgets, UNCATAGORIZED_ID } from '../context/BudgetContext'
import { currencyFormatter } from '../utils'


function ViewExpenseModal({ budgetId, handleClose }) {
    const { budgets, getBudgetExpenses, deleteExpenses, deleteBudget } = useBudgets();

    const budget = budgetId === UNCATAGORIZED_ID ? { id: UNCATAGORIZED_ID, name: 'uncategorized' } : budgets.find((b => b.id === budgetId))
    const expenses = getBudgetExpenses(budgetId)
    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATAGORIZED_ID && (<Button variant="outline-danger" onClick={() => { deleteBudget(budget), handleClose() }}>Delete</Button>)}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map((expense) =>
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">
                                {currencyFormatter.format(expense.amount)}
                            </div>
                            <Button
                                onClick={() => deleteExpenses(expense)}
                                size="sm"
                                variant="outline-danger"
                            >
                                &times;
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Modal.Body>

        </Modal >
    )
}

ViewExpenseModal.propTypes = {
    budgetId: PropTypes.string,
    handleClose: PropTypes.func
}

export default ViewExpenseModal