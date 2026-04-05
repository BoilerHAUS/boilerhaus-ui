import { cn } from '../../lib/cn'

export type StepState          = 'completed' | 'active' | 'upcoming' | 'error'
export type StepperOrientation = 'horizontal' | 'vertical'

export interface Step {
  label:        string
  description?: string
  /** Override the computed state for this step, e.g. 'error'. */
  state?:       StepState
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps:        Step[]
  /** Zero-based index of the currently active step. */
  currentStep:  number
  orientation?: StepperOrientation
}

/* ----------------------------------------------------------
   Helpers
   ---------------------------------------------------------- */

function resolveState(step: Step, index: number, currentStep: number): StepState {
  if (step.state) return step.state
  if (index < currentStep)  return 'completed'
  if (index === currentStep) return 'active'
  return 'upcoming'
}

/* ----------------------------------------------------------
   Step indicator icon
   ---------------------------------------------------------- */

function StepIcon({ state, index }: { state: StepState; index: number }) {
  const base = 'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-base'

  if (state === 'completed') {
    return (
      <span className={cn(base, 'bg-[var(--color-growth)] text-paper')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 7l3.5 3.5L12 3" />
        </svg>
      </span>
    )
  }

  if (state === 'error') {
    return (
      <span className={cn(base, 'bg-signal text-paper')}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12" />
        </svg>
      </span>
    )
  }

  if (state === 'active') {
    return (
      <span className={cn(
        base,
        'bg-signal-alt text-paper',
        'ring-4 ring-[color-mix(in_srgb,var(--color-signal-alt)_20%,var(--color-paper))]',
      )}>
        <span className="font-display font-bold text-xs leading-none">{index + 1}</span>
      </span>
    )
  }

  // upcoming
  return (
    <span className={cn(base, 'border-2 border-rule bg-paper text-smoke')}>
      <span className="font-display font-bold text-xs leading-none">{index + 1}</span>
    </span>
  )
}

/* ----------------------------------------------------------
   Stepper — horizontal
   ---------------------------------------------------------- */

function HorizontalStepper({ steps, currentStep }: { steps: Step[]; currentStep: number }) {
  return (
    <div className="flex items-start w-full">
      {steps.map((step, i) => {
        const state   = resolveState(step, i, currentStep)
        const isLast  = i === steps.length - 1
        const lineComplete = i < currentStep

        return (
          <div
            key={i}
            role="listitem"
            aria-current={state === 'active' ? 'step' : undefined}
            className={cn('flex items-start', !isLast && 'flex-1')}
          >
            {/* Icon + label stacked */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <StepIcon state={state} index={i} />
              <p className={cn(
                'text-xs font-display font-bold tracking-widest uppercase leading-tight text-center',
                state === 'active'    && 'text-void',
                state === 'completed' && 'text-[var(--color-growth)]',
                state === 'error'     && 'text-signal',
                state === 'upcoming'  && 'text-smoke',
              )}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-smoke leading-snug text-center max-w-[100px]">
                  {step.description}
                </p>
              )}
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  'flex-1 h-px mt-4 mx-2 transition-colors duration-base',
                  lineComplete ? 'bg-[var(--color-growth)]' : 'bg-rule',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------
   Stepper — vertical
   ---------------------------------------------------------- */

function VerticalStepper({ steps, currentStep }: { steps: Step[]; currentStep: number }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => {
        const state  = resolveState(step, i, currentStep)
        const isLast = i === steps.length - 1
        const lineComplete = i < currentStep

        return (
          <div
            key={i}
            role="listitem"
            aria-current={state === 'active' ? 'step' : undefined}
            className="flex gap-3"
          >
            {/* Left column: icon + connector line */}
            <div className="flex flex-col items-center">
              <StepIcon state={state} index={i} />
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={cn(
                    'w-px flex-1 my-1 min-h-[20px] transition-colors duration-base',
                    lineComplete ? 'bg-[var(--color-growth)]' : 'bg-rule',
                  )}
                />
              )}
            </div>

            {/* Right column: label + description */}
            <div className={cn('flex flex-col justify-center', !isLast && 'pb-6')}>
              <p className={cn(
                'text-xs font-display font-bold tracking-widest uppercase leading-tight',
                state === 'active'    && 'text-void',
                state === 'completed' && 'text-[var(--color-growth)]',
                state === 'error'     && 'text-signal',
                state === 'upcoming'  && 'text-smoke',
              )}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-smoke leading-snug mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------
   Stepper (public)
   ---------------------------------------------------------- */

/**
 * Progress indicator for multi-step flows.
 * Step states are computed automatically from `currentStep`; override a
 * specific step by setting `step.state = 'error'`.
 *
 * @example
 * <Stepper steps={wizardSteps} currentStep={1} />
 * <Stepper steps={coSteps} currentStep={2} orientation="vertical" />
 */
export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
  ...props
}: StepperProps) {
  return (
    <div
      role="list"
      aria-label="Progress"
      className={cn(className)}
      {...props}
    >
      {orientation === 'vertical'
        ? <VerticalStepper   steps={steps} currentStep={currentStep} />
        : <HorizontalStepper steps={steps} currentStep={currentStep} />
      }
    </div>
  )
}
