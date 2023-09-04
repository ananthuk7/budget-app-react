import { Button, Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import './App.css'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import { useState } from 'react'
import { useBudgets } from './context/BudgetContext'
import UnCategorizedBudget from './components/UnCategorizedBudget'
import TotalBudgetCard from './components/TotalBudgetCard'

function App() {
  const [showAddBudgetModal, setAddBudgetModal] = useState(false)
  const [showExpenseModal, setExpenseModal] = useState(false)
  const [addBudgetId, setAddBudgetId] = useState('')
  const { budgets, getBudgetExpenses } = useBudgets()

  function openExpenseModal(budgetId) {
    setExpenseModal(true)
    setAddBudgetId(budgetId);
  }

  return (
    <Container className="my-4">
      <Stack direction='horizontal' gap="2" className='mb-4' >
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='primary' onClick={() => setAddBudgetModal(true)}>Add budgets</Button>
        <Button variant='outline-primary' onClick={openExpenseModal}>Add Expense</Button>
      </Stack>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", alignItems: "flex-start" }}>
        {budgets.map((budget) => {
          // console.log(getBudgetExpenses(budget.id));
          const amount = getBudgetExpenses(budget.id).reduce((acc, expense) => acc + expense.amount, 0)
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              openExpenseModel={() => openExpenseModal(budget.id)}
              grey>
            </BudgetCard>)
        }
        )}
        <UnCategorizedBudget openExpenseModel={openExpenseModal} />
        <TotalBudgetCard />
      </div>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setAddBudgetModal(false)} />
      <AddExpenseModal show={showExpenseModal} handleClose={() => setExpenseModal(false)} defaultBudgetId={addBudgetId} />
    </Container>
  )
}

export default App
