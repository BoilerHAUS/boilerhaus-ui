import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { FileUpload } from './FileUpload'

const meta = {
  title:     'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onFilesChange: fn(),
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {}


/* ----------------------------------------------------------
   Images only
   ---------------------------------------------------------- */

export const ImagesOnly: Story = {
  name: 'Images Only',
  args: {
    accept:   'image/*',
    multiple: true,
    hint:     'PNG, JPG or WEBP — max 5 MB each',
  },
}


/* ----------------------------------------------------------
   PDFs only
   ---------------------------------------------------------- */

export const PDFsOnly: Story = {
  name: 'PDFs Only',
  args: {
    accept:   '.pdf',
    multiple: true,
    hint:     'PDF files only',
  },
}


/* ----------------------------------------------------------
   Single file
   ---------------------------------------------------------- */

export const SingleFile: Story = {
  name: 'Single File',
  args: {
    multiple: false,
    hint:     'One file at a time',
  },
}


/* ----------------------------------------------------------
   With size limit
   ---------------------------------------------------------- */

export const WithSizeLimit: Story = {
  name: 'With Size Limit (2 MB)',
  args: {
    maxSize:  2 * 1024 * 1024,
    multiple: true,
    hint:     'Max 2 MB per file',
  },
}


/* ----------------------------------------------------------
   Disabled
   ---------------------------------------------------------- */

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}


/* ----------------------------------------------------------
   ScopeHouse — CO attachments
   ---------------------------------------------------------- */

export const COAttachments: Story = {
  name: 'ScopeHouse — CO Attachments',
  render: (args) => (
    <div className="w-96 border border-rule rounded-md p-5 flex flex-col gap-4">
      <div>
        <p className="font-display font-bold text-sm tracking-widest uppercase text-void mb-0.5">
          Supporting Documents
        </p>
        <p className="text-sm text-smoke">Attach quotes, photos, or drawings for CO #14.</p>
      </div>
      <FileUpload
        accept=".pdf,.jpg,.jpeg,.png,.dwg,.xlsx"
        multiple
        maxSize={20 * 1024 * 1024}
        maxFiles={10}
        hint="PDF, images, DWG, XLSX — max 20 MB each"
        {...args}
      />
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Project drawing upload
   ---------------------------------------------------------- */

export const DrawingUpload: Story = {
  name: 'ScopeHouse — Drawing Upload',
  render: (args) => (
    <div className="w-96">
      <FileUpload
        accept=".pdf,.dwg,.dxf,.rvt"
        multiple
        maxSize={50 * 1024 * 1024}
        hint="PDF, DWG, DXF, or RVT — max 50 MB"
        label="Upload drawings"
        {...args}
      />
    </div>
  ),
}
