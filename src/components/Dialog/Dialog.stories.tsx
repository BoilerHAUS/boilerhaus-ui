import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './Dialog'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { Label } from '../Label/Label'

const meta = {
  title:     'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Confirmation dialogs
   ---------------------------------------------------------- */

export const ConfirmDestructive: Story = {
  name: 'Confirm — Destructive Action',
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogDescription>
          This will permanently delete "123 Main St — Kitchen Reno" and all
          associated change orders. This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const ConfirmApproval: Story = {
  name: 'Confirm — Approval',
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="primary">Approve Change Order</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Approve Change Order</DialogTitle>
        <DialogDescription>
          CO-004 — Electrical Upgrade (+$3,200) will be approved and added to the
          contract value. The client will be notified.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}


/* ----------------------------------------------------------
   Form dialog
   ---------------------------------------------------------- */

export const FormDialog: Story = {
  name: 'Form — Quick Edit',
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit Project Name</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogDescription>
          Update the project name. Changes will be reflected across all documents.
        </DialogDescription>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[6px]">
            <Label htmlFor="dialog-project-name" required>Project Name</Label>
            <Input
              id="dialog-project-name"
              defaultValue="123 Main St — Kitchen Reno"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'Dialog Types',
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="secondary">Info Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Information</DialogTitle>
          <DialogDescription>
            This is an informational dialog. No destructive actions here.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="primary">Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button variant="destructive">Destructive Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
}
