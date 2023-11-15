import { FC } from 'react'
import { Skeleton } from '@components/system'
import { StyledCountItem } from './'

type Props = {
  title: string
  count: number
  loading?: boolean
}

// TODO - Extract this into a helper to replace formatLargeNumber
const formatCount = (n: number): string => {
  const notation = n >= 100000 ? 'compact' : 'standard'
  const formatter = new Intl.NumberFormat('en', { notation, compactDisplay: 'short' })

  return formatter.format(n)
}

const CountItem: FC<Props> = ({ title, count, loading }) => {
  if (loading) return <Skeleton />

  return (
    <StyledCountItem>
      <div className="analytics-group-item">
        <div className="analytics-heading">
          <span className="analytics-heading-title">{title}</span>
        </div>
        <div className="analytics-data">
          <span className="analytics-amount">{formatCount(count)}</span>
        </div>
      </div>
    </StyledCountItem>
  )
}

export default CountItem
