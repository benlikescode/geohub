import MapPage from '@pages/map/[id]'
import { render, screen } from '@testing-library/react'

test('should show map page', () => {
  render(<MapPage />)
})
