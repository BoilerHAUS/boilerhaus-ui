import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper } from './Stepper'
import type { Step } from './Stepper'

const meta = {
  title:     'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const basicSteps: Step[] = [
  { label: 'Project Details' },
  { label: 'Scope of Work' },
  { label: 'Team & Contacts' },
  { label: 'Review & Submit' },
]


/* ----------------------------------------------------------
   Default — step 1 active
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    steps:       basicSteps,
    currentStep: 0,
  },
}


/* ----------------------------------------------------------
   Mid-progress
   ---------------------------------------------------------- */

export const MidProgress: Story = {
  name: 'Mid Progress',
  args: {
    steps:       basicSteps,
    currentStep: 2,
  },
}


/* ----------------------------------------------------------
   Complete
   ---------------------------------------------------------- */

export const Complete: Story = {
  args: {
    steps:       basicSteps,
    currentStep: 4,  // beyond last index → all complete
  },
}


/* ----------------------------------------------------------
   With descriptions
   ---------------------------------------------------------- */

const stepsWithDesc: Step[] = [
  { label: 'Project Details',   description: 'Name, address, and contract value' },
  { label: 'Scope of Work',     description: 'Add phases, items, and quantities' },
  { label: 'Team & Contacts',   description: 'Assign PM, trades, and subcontractors' },
  { label: 'Review & Submit',   description: 'Confirm and send for client approval' },
]

export const WithDescriptions: Story = {
  name: 'With Descriptions',
  args: {
    steps:       stepsWithDesc,
    currentStep: 1,
  },
}


/* ----------------------------------------------------------
   With error state
   ---------------------------------------------------------- */

const stepsWithError: Step[] = [
  { label: 'Project Details' },
  { label: 'Scope of Work', state: 'error', description: 'Missing required fields' },
  { label: 'Team & Contacts' },
  { label: 'Review & Submit' },
]

export const WithError: Story = {
  name: 'With Error',
  args: {
    steps:       stepsWithError,
    currentStep: 1,
  },
}


/* ----------------------------------------------------------
   Vertical orientation
   ---------------------------------------------------------- */

export const Vertical: Story = {
  name: 'Vertical',
  args: {
    steps:       stepsWithDesc,
    currentStep: 1,
    orientation: 'vertical',
  },
}

export const VerticalWithError: Story = {
  name: 'Vertical with Error',
  args: {
    steps:       stepsWithError,
    currentStep: 1,
    orientation: 'vertical',
  },
}


/* ----------------------------------------------------------
   ScopeHouse — Create project wizard
   ---------------------------------------------------------- */

const projectWizardSteps: Step[] = [
  { label: 'Project Details',   description: 'Name, address, owner info' },
  { label: 'Contract Setup',    description: 'Value, start date, payment terms' },
  { label: 'Scope & Phases',    description: 'Define work phases and items' },
  { label: 'Team Assignment',   description: 'PM, supers, and trade contacts' },
  { label: 'Review & Publish',  description: 'Final review before going live' },
]

export const CreateProjectWizard: Story = {
  name: 'ScopeHouse — Create Project Wizard',
  render: () => (
    <div className="w-full max-w-2xl border border-rule rounded-md p-6 flex flex-col gap-8">
      <div>
        <p className="font-display font-bold text-lg uppercase tracking-wide text-void mb-1">
          New Project
        </p>
        <p className="text-sm text-smoke">Step 3 of 5 — Define your scope and phases.</p>
      </div>
      <Stepper steps={projectWizardSteps} currentStep={2} />
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — CO submission flow (vertical)
   ---------------------------------------------------------- */

const coSubmissionSteps: Step[] = [
  { label: 'CO Drafted',         description: 'Contractor submits change order request' },
  { label: 'PM Review',          description: 'Project manager reviews scope and pricing' },
  { label: 'Owner Approval',     description: 'Owner countersigns for COs over $5,000' },
  { label: 'Work Order Issued',  description: 'Approved CO becomes a work order' },
  { label: 'Complete & Invoiced' },
]

export const COSubmissionFlow: Story = {
  name: 'ScopeHouse — CO Submission Flow (Vertical)',
  render: () => (
    <div className="w-72 border border-rule rounded-md p-5">
      <p className="font-display text-xs tracking-widest uppercase text-smoke mb-4">
        CO #14 — Status
      </p>
      <Stepper steps={coSubmissionSteps} currentStep={2} orientation="vertical" />
    </div>
  ),
}
