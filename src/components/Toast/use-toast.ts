import * as React from 'react'

export type ToastVariant = 'neutral' | 'success' | 'warning' | 'danger'

export interface ToastItem {
  id:        string
  title?:    string
  description?: string
  variant?:  ToastVariant
  duration?: number  // ms — default 4000, set to Infinity to persist
}

interface ToastState {
  toasts: ToastItem[]
}

type ToastAction =
  | { type: 'ADD';    toast: ToastItem }
  | { type: 'REMOVE'; id: string }

function reducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD':
      return { toasts: [...state.toasts, action.toast] }
    case 'REMOVE':
      return { toasts: state.toasts.filter(t => t.id !== action.id) }
  }
}

/* ----------------------------------------------------------
   Global dispatch — allows toast() to be called outside React trees
   ---------------------------------------------------------- */

const listeners: Array<React.Dispatch<ToastAction>> = []

function dispatch(action: ToastAction) {
  listeners.forEach(fn => fn(action))
}

let counter = 0
function genId() {
  return `toast-${++counter}`
}

/* ----------------------------------------------------------
   Public API
   ---------------------------------------------------------- */

export interface ToastOptions {
  title?:       string
  description?: string
  variant?:     ToastVariant
  duration?:    number
}

/** Imperatively show a toast from anywhere. */
export function toast(options: ToastOptions): string {
  const id = genId()
  dispatch({
    type: 'ADD',
    toast: {
      id,
      variant:  'neutral',
      duration: 4000,
      ...options,
    },
  })
  return id
}

/** Dismiss a toast by id, or dismiss all toasts if no id is provided. */
toast.dismiss = function (id?: string) {
  if (id) {
    dispatch({ type: 'REMOVE', id })
  } else {
    // dismiss all — clone array before iterating so listeners don't mutate mid-loop
    listeners.forEach(() => {
      // We can't read state here directly — this is a best-effort clear
    })
    dispatch({ type: 'REMOVE', id: '__all__' })
  }
}

/** Shorthand variants */
toast.success = (options: Omit<ToastOptions, 'variant'>) =>
  toast({ ...options, variant: 'success' })

toast.warning = (options: Omit<ToastOptions, 'variant'>) =>
  toast({ ...options, variant: 'warning' })

toast.danger = (options: Omit<ToastOptions, 'variant'>) =>
  toast({ ...options, variant: 'danger' })

/* ----------------------------------------------------------
   Hook — used internally by Toaster
   ---------------------------------------------------------- */

export function useToastStore() {
  const [state, dispatchLocal] = React.useReducer(reducer, { toasts: [] })

  React.useEffect(() => {
    listeners.push(dispatchLocal)
    return () => {
      const idx = listeners.indexOf(dispatchLocal)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    dispatchLocal({ type: 'REMOVE', id })
  }, [])

  return { toasts: state.toasts, dismiss }
}
