'use client'

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { th } from 'date-fns/locale'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  onDateRangeChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>()

  // ส่งค่าวันที่ที่เลือกไปยัง parent component
  React.useEffect(() => {
    onDateRangeChange(date)
  }, [date, onDateRangeChange])

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: th })} -{" "}
                  {format(date.to, "dd/MM/yyyy", { locale: th })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: th })
              )
            ) : (
              <span>เลือกช่วงวันที่</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            locale={th}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}