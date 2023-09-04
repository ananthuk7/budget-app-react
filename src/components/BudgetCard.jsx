import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { currencyFormatter } from '../utils'
function BudgetCard({ name, amount, max, grey, openExpenseModel, buttonActive }) {
    const classNames = [];
    if (amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10')
    } else if (grey) {
        classNames.push("bg-light")
    }
    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <div>{name}</div>
                    <div>{currencyFormatter.format(amount)}
                        {max && <span className="ms-1 fs-6">/{currencyFormatter.format(max)}</span>}
                    </div>
                </Card.Title>
                {max && <ProgressBar className="rounded-pill" max={max} min={0} now={amount} variant={getVarientProgress(max, amount)}></ProgressBar>}
                {!buttonActive && <Stack direction='horizontal' gap="2" className='mt-4' >
                    <Button variant='outline-primary' className='ms-auto' onClick={openExpenseModel}    >Add Expense</Button>
                    <Button variant='outline-secondary' >View Expense</Button>
                </Stack>}
            </Card.Body>
        </Card>
    )
}

function getVarientProgress(max, amount) {
    const ratio = amount / max;
    if (ratio < .5) return 'primary'
    if (ratio < .75) return 'warning'
    return "danger"
}

BudgetCard.propTypes = {
    name: PropTypes.string,
    amount: PropTypes.number,
    max: PropTypes.number,
    grey: PropTypes.bool,
    openExpenseModel: PropTypes.func,
    buttonActive: PropTypes.bool,
}

export default BudgetCard