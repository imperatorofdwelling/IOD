'use client'

import ru from 'date-fns/locale/ru'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../../../app/styles/dark-mode.css'

interface ICalendar {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates?: Date[]
}

const Calendar: React.FC<ICalendar> = ({ value, onChange, disabledDates }) => {
  return (
    <DateRange
      locale={ru}
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default Calendar