import { render, screen } from '@testing-library/react'
import MapPage from '../../pages/map/[id]'

test('should show map page', () => {
  render(<MapPage />)
})
