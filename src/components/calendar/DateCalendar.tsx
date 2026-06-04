import { useState } from 'react'

interface DateCalendarProps {
  selectedDate: string
  onSelectDate: (date: string) => void
}

interface CalendarDay {
  date: Date
  isoDate: string
  isCurrentMonth: boolean
  isPast: boolean
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function buildCalendarDays(monthDate: Date): CalendarDay[] {
  const today = startOfDay(new Date())
  const firstDayOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1,
  )
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)

    return {
      date,
      isoDate: formatIsoDate(date),
      isCurrentMonth: date.getMonth() === monthDate.getMonth(),
      isPast: startOfDay(date) < today,
    }
  })
}

export function DateCalendar({
  selectedDate,
  onSelectDate,
}: DateCalendarProps) {
  const today = new Date()
  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate ? new Date(`${selectedDate}T12:00:00`) : today,
  )
  const monthDate = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  )
  const calendarDays = buildCalendarDays(monthDate)
  const monthLabel = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(monthDate)
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const isPreviousMonthDisabled = monthDate <= currentMonth

  function handlePreviousMonth() {
    setVisibleMonth(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    )
  }

  function handleNextMonth() {
    setVisibleMonth(
      (currentDate) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    )
  }

  return (
    <div className="rounded-md border border-stone-800 bg-stone-900/90 p-3 shadow-sm shadow-black/20">
      <div className="mb-3 flex items-center justify-between gap-3">
        <button
          type="button"
          className="min-h-10 rounded-md border border-stone-700 bg-stone-950/60 px-3 text-sm font-semibold text-stone-200 transition hover:border-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
          disabled={isPreviousMonthDisabled}
          onClick={handlePreviousMonth}
        >
          Anterior
        </button>
        <p className="text-base font-semibold capitalize text-stone-50">
          {monthLabel}
        </p>
        <button
          type="button"
          className="min-h-10 rounded-md border border-stone-700 bg-stone-950/60 px-3 text-sm font-semibold text-stone-200 transition hover:border-amber-700"
          onClick={handleNextMonth}
        >
          Proximo
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map((weekDay) => (
          <span key={weekDay} className="py-2 text-xs font-semibold text-stone-400">
            {weekDay}
          </span>
        ))}

        {calendarDays.map((calendarDay) => {
          const isSelected = calendarDay.isoDate === selectedDate
          const isDisabled = calendarDay.isPast || !calendarDay.isCurrentMonth

          return (
            <button
              key={calendarDay.isoDate}
              type="button"
              className={[
                'aspect-square rounded-md border text-sm font-semibold transition',
                isSelected
                  ? 'border-amber-400 bg-amber-400 text-stone-950'
                  : 'border-stone-800 bg-stone-950 text-stone-100',
                isDisabled
                  ? 'cursor-not-allowed opacity-30'
                  : 'hover:border-amber-700 hover:bg-stone-800',
              ].join(' ')}
              disabled={isDisabled}
              onClick={() => onSelectDate(calendarDay.isoDate)}
            >
              {calendarDay.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
