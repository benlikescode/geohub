import { FC } from 'react'
import { Skeleton } from '@components/system'
import { formatLargeNumber } from '../../../../utils/helpers'
import { StyledCountItem } from './'

type Props = {
  title: string
  count: number
  loading?: boolean
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
          <span className="analytics-amount">{formatLargeNumber(count)}</span>
        </div>
      </div>
    </StyledCountItem>
  )
}

export default CountItem
