import { Modal, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useRef } from 'react';
import { useBudgets, UNCATAGORIZED_ID } from '../context/BudgetContext'



function AddBudgetModal({ show, handleClose, defaultBudgetId }) {

    const descRef = useRef();
    const amountRef = useRef();
    const budgetRef = useRef();
    const { addExpenses, budgets } = useBudgets();
    function handleSubmit(event) {
        event.preventDefault();
        addExpenses({
            description: descRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetRef.current.value
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descRef} type='text' required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='max'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type='number' min={0} step={0.01} required />
                    </Form.Group>
                    <Form.Select ref={budgetRef} defaultValue={defaultBudgetId}>
                        <option value={UNCATAGORIZED_ID}>uncatogorized</option>
                        {budgets.map((budget) => (<option key={budget.id} value={budget.id}>{budget.name}</option>))}
                    </Form.Select >
                    <div className="d-flex justify-content-end">
                        <Button variant='primary' type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

AddBudgetModal.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    defaultBudgetId: PropTypes.string
}

export default AddBudgetModal