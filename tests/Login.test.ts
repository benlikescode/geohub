import LoginPage from '@pages/login'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('should show login container', () => {
  it('render login container', async () => {
    render(<LoginPage />)
    const heading = screen.getByText('Welcome Back!')
    expect(heading).toBeInTheDocument()
  })
})
