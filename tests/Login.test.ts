import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../pages/login'

describe('should show login container', () => {
  it('render login container', async () => {
    render(<LoginPage />)
    const heading = screen.getByText('Welcome Back!')
    expect(heading).toBeInTheDocument()
  })
})
