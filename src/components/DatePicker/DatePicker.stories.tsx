import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Label } from '../Label'
import { DatePicker } from './DatePicker'

const meta = {
  title:     'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    placeholder: 'Select date…',
  },
}


/* ----------------------------------------------------------
   Pre-selected date
   ---------------------------------------------------------- */

export const PreSelected: Story = {
  name: 'Pre-selected',
  args: {
    value: new Date(2026, 5, 30),  // June 30, 2026
  },
}


/* ----------------------------------------------------------
   Disabled
   ---------------------------------------------------------- */

export const Disabled: Story = {
  args: {
    disabled:    true,
    value:       new Date(2026, 5, 30),
    placeholder: 'Select date…',
  },
}


/* ----------------------------------------------------------
   Controlled — with React state
   ---------------------------------------------------------- */

export const Controlled: Story = {
  name: 'Controlled (interactive)',
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
      <div className="flex flex-col gap-3 w-64">
        <DatePicker
          value={date}
          onValueChange={setDate}
          placeholder="Pick a date…"
        />
        {date && (
          <p className="text-sm text-smoke">
            Selected: <span className="text-void font-medium">
              {new Intl.DateTimeFormat('en-CA', { dateStyle: 'full' }).format(date)}
            </span>
          </p>
        )}
      </div>
    )
  },
}


/* ----------------------------------------------------------
   With Label (composed)
   ---------------------------------------------------------- */

export const WithLabel: Story = {
  name: 'Composed With Label',
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    return (
      <div className="flex flex-col gap-1.5 w-64">
        <Label htmlFor="start-date">Project Start Date</Label>
        <DatePicker
          id="start-date"
          value={date}
          onValueChange={setDate}
          placeholder="Select start date…"
        />
      </div>
    )
  },
}


/* ----------------------------------------------------------
   ScopeHouse — Project dates form
   ---------------------------------------------------------- */

export const ProjectDates: Story = {
  name: 'ScopeHouse — Project Dates',
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>()
    const [endDate,   setEndDate]   = useState<Date | undefined>()
    return (
      <div className="w-80 border border-rule rounded-md p-5 flex flex-col gap-4">
        <p className="font-display font-bold text-sm tracking-widest uppercase text-void">
          Project Schedule
        </p>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="proj-start">Start Date</Label>
          <DatePicker
            id="proj-start"
            value={startDate}
            onValueChange={setStartDate}
            placeholder="Select start date…"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="proj-end">Substantial Completion</Label>
          <DatePicker
            id="proj-end"
            value={endDate}
            onValueChange={setEndDate}
            placeholder="Select completion date…"
          />
        </div>
        {startDate && endDate && startDate < endDate && (
          <p className="text-sm text-smoke">
            Duration:{' '}
            <span className="text-void font-medium">
              {Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000)} days
            </span>
          </p>
        )}
      </div>
    )
  },
}


/* ----------------------------------------------------------
   ScopeHouse — CO due date
   ---------------------------------------------------------- */

export const CODueDate: Story = {
  name: 'ScopeHouse — CO Response Deadline',
  render: () => {
    const [due, setDue] = useState<Date | undefined>(new Date(2026, 3, 18))
    return (
      <div className="w-72 border border-rule rounded-md p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs tracking-widest uppercase text-smoke">CO #14</span>
          <span className="text-xs text-smoke">Response required</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="co-due">Response Deadline</Label>
          <DatePicker
            id="co-due"
            value={due}
            onValueChange={setDue}
          />
        </div>
      </div>
    )
  },
}
