import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { FormGroup, FormSection } from './FormGroup'
import { Input } from '../Input'
import { Textarea } from '../Textarea'
import { Select, SelectItem } from '../Select'
import { Checkbox } from '../Checkbox'
import { RadioGroup, Radio } from '../RadioGroup'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Grid, GridCol } from '../Grid'

const meta: Meta<typeof FormGroup> = {
  title: 'Layout/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof FormGroup>

export const Default: Story = {
  render: () => (
    <FormGroup label="Full name" fieldId="name">
      <Input id="name" placeholder="Jane Smith" />
    </FormGroup>
  ),
}

export const WithHelper: Story = {
  render: () => (
    <FormGroup
      label="Email address"
      fieldId="email"
      helper="We'll only use this to send receipts."
    >
      <Input id="email" type="email" placeholder="jane@example.com" aria-describedby="email-help" />
    </FormGroup>
  ),
}

export const WithError: Story = {
  render: () => (
    <FormGroup
      label="Email address"
      fieldId="email-err"
      error="Please enter a valid email address."
    >
      <Input id="email-err" type="email" defaultValue="not-an-email" aria-describedby="email-err-help" aria-invalid />
    </FormGroup>
  ),
}

export const Required: Story = {
  render: () => (
    <FormGroup label="Password" fieldId="pw" required helper="Minimum 12 characters.">
      <Input id="pw" type="password" aria-required aria-describedby="pw-help" />
    </FormGroup>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <FormGroup label="Country" fieldId="country" required>
      <Select id="country" aria-required>
        <SelectItem value="ca">Canada</SelectItem>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="gb">United Kingdom</SelectItem>
      </Select>
    </FormGroup>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <FormGroup
      label="Description"
      fieldId="desc"
      helper="Briefly describe the project scope."
    >
      <Textarea id="desc" rows={4} placeholder="We're looking for…" aria-describedby="desc-help" />
    </FormGroup>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <Stack gap={6}>
      <FormGroup label="Default" fieldId="v1">
        <Input id="v1" placeholder="Value" />
      </FormGroup>

      <FormGroup label="With helper" fieldId="v2" helper="Some context below the field.">
        <Input id="v2" placeholder="Value" aria-describedby="v2-help" />
      </FormGroup>

      <FormGroup label="With error" fieldId="v3" error="This field is required.">
        <Input id="v3" placeholder="Value" aria-invalid aria-describedby="v3-help" />
      </FormGroup>

      <FormGroup label="Required" fieldId="v4" required>
        <Input id="v4" placeholder="Value" aria-required />
      </FormGroup>

      <FormGroup label="Required + error" fieldId="v5" required error="Cannot be blank.">
        <Input id="v5" aria-required aria-invalid aria-describedby="v5-help" />
      </FormGroup>
    </Stack>
  ),
}

/**
 * Real-world form composed with Stack, Grid, FormGroup, FormSection.
 * This is the story to reference when building forms in your app.
 */
export const CompleteForm: Story = {
  name: 'Complete form (with Stack + Grid)',
  render: () => (
    <form
      style={{ maxWidth: 640 }}
      onSubmit={(e) => { e.preventDefault(); fn()() }}
    >
      <Stack gap={8}>

        <FormSection
          title="Personal details"
          description="Your name and contact information."
        >
          <Grid gap={5} rowGap={4}>
            <GridCol span={6}>
              <FormGroup label="First name" fieldId="first" required>
                <Input id="first" placeholder="Jane" aria-required />
              </FormGroup>
            </GridCol>
            <GridCol span={6}>
              <FormGroup label="Last name" fieldId="last" required>
                <Input id="last" placeholder="Smith" aria-required />
              </FormGroup>
            </GridCol>
            <GridCol span={12}>
              <FormGroup
                label="Email address"
                fieldId="contact-email"
                required
                helper="Used for account notifications."
              >
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="jane@example.com"
                  aria-required
                  aria-describedby="contact-email-help"
                />
              </FormGroup>
            </GridCol>
          </Grid>
        </FormSection>

        <FormSection
          title="Organization"
          description="Tell us about your company or team."
        >
          <Stack gap={4}>
            <FormGroup label="Company name" fieldId="company">
              <Input id="company" placeholder="Acme Corp" />
            </FormGroup>

            <FormGroup label="Team size" fieldId="team-size">
              <Select id="team-size">
                <SelectItem value="solo">Just me</SelectItem>
                <SelectItem value="small">2–10</SelectItem>
                <SelectItem value="mid">11–50</SelectItem>
                <SelectItem value="large">51–200</SelectItem>
                <SelectItem value="enterprise">200+</SelectItem>
              </Select>
            </FormGroup>

            <FormGroup label="Role" fieldId="role" helper="Select the option that best fits.">
              <RadioGroup aria-describedby="role-help">
                <Radio value="dev" label="Developer" name="role" />
                <Radio value="design" label="Designer" name="role" />
                <Radio value="pm" label="Product manager" name="role" />
                <Radio value="other" label="Other" name="role" />
              </RadioGroup>
            </FormGroup>
          </Stack>
        </FormSection>

        <FormSection title="Additional information">
          <Stack gap={4}>
            <FormGroup
              label="How can we help?"
              fieldId="notes"
              helper="Max 500 characters."
            >
              <Textarea
                id="notes"
                rows={4}
                placeholder="Describe your goals…"
                aria-describedby="notes-help"
              />
            </FormGroup>

            <Checkbox label="Subscribe to product updates and announcements" />
          </Stack>
        </FormSection>

        <Stack direction="row" gap={3} justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" type="submit">Submit request</Button>
        </Stack>

      </Stack>
    </form>
  ),
}
