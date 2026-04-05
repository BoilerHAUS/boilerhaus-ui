import React, { useRef, useState, useCallback, useId } from 'react'
import { cn } from '../../lib/cn'

export interface FileUploadProps {
  /** Accepted MIME types or extensions, e.g. ".pdf,image/*". Passed to <input>. */
  accept?:         string
  multiple?:       boolean
  /** Max bytes per file. Violations are reported as errors, not silently dropped. */
  maxSize?:        number
  /** Max total files. Additional files beyond this are ignored with an error. */
  maxFiles?:       number
  onFilesChange?:  (files: File[]) => void
  disabled?:       boolean
  /** Override the primary drop zone label. */
  label?:          string
  /** Short helper text shown below the label inside the drop zone. */
  hint?:           string
  className?:      string
  id?:             string
}

/* ----------------------------------------------------------
   Helpers
   ---------------------------------------------------------- */

function formatBytes(bytes: number): string {
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1048576)     return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function getFileExtension(file: File): string {
  return file.name.split('.').pop()?.toUpperCase() ?? '?'
}

/* ----------------------------------------------------------
   Icons
   ---------------------------------------------------------- */

function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 22a6 6 0 0 1 0-12h.5A8.5 8.5 0 0 1 27 14.5c0 4.14-3.36 7.5-7.5 7.5H10z" />
      <path d="M16 26V16M12 20l4-4 4 4" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6l-3-4z" />
      <path d="M10 2v4h4" />
    </svg>
  )
}

/* ----------------------------------------------------------
   FileUpload
   ---------------------------------------------------------- */

/**
 * Drag-and-drop file upload zone.
 * Validates file size and count; reports errors inline.
 * Use `accept` to restrict file types (passed straight to `<input type="file">`).
 *
 * @example
 * <FileUpload accept=".pdf" multiple maxSize={10 * 1024 * 1024} onFilesChange={setDocs} />
 */
export function FileUpload({
  accept,
  multiple  = true,
  maxSize,
  maxFiles,
  onFilesChange,
  disabled  = false,
  label     = 'Drop files here or click to browse',
  hint,
  className,
  id,
}: FileUploadProps) {
  const [files,    setFiles]    = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [errors,   setErrors]   = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const genId    = useId()
  const inputId  = id ?? genId

  const validate = useCallback((incoming: File[]): { accepted: File[]; errors: string[] } => {
    const errs: string[] = []
    let accepted = incoming

    if (maxFiles && files.length + incoming.length > maxFiles) {
      const allowed = maxFiles - files.length
      errs.push(`Max ${maxFiles} files — only ${allowed > 0 ? allowed : 0} more can be added.`)
      accepted = incoming.slice(0, Math.max(0, allowed))
    }

    if (maxSize) {
      const tooBig = accepted.filter((f) => f.size > maxSize)
      if (tooBig.length > 0) {
        errs.push(`${tooBig.map((f) => f.name).join(', ')} exceed${tooBig.length === 1 ? 's' : ''} the ${formatBytes(maxSize)} limit.`)
        accepted = accepted.filter((f) => f.size <= maxSize)
      }
    }

    return { accepted, errors: errs }
  }, [files.length, maxSize, maxFiles])

  const addFiles = useCallback((incoming: File[]) => {
    // Deduplicate by name+size
    const existing = new Set(files.map((f) => `${f.name}:${f.size}`))
    const fresh    = incoming.filter((f) => !existing.has(`${f.name}:${f.size}`))

    const { accepted, errors: errs } = validate(fresh)
    const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1)
    setFiles(next)
    setErrors(errs)
    onFilesChange?.(next)
  }, [files, multiple, onFilesChange, validate])

  const removeFile = useCallback((index: number) => {
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    setErrors([])
    onFilesChange?.(next)
    // Reset input so the same file can be re-added
    if (inputRef.current) inputRef.current.value = ''
  }, [files, onFilesChange])

  /* --- Drag handlers --- */
  function onDragEnter(e: React.DragEvent) {
    e.preventDefault()
    if (!disabled) setDragging(true)
  }
  function onDragLeave(e: React.DragEvent) {
    e.preventDefault()
    if (e.currentTarget === e.target) setDragging(false)
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    addFiles(Array.from(e.dataTransfer.files))
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files))
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Drop zone */}
      <div
        role="button"
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !disabled && inputRef.current?.click() } }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed',
          'py-8 px-4 text-center cursor-pointer',
          'transition-colors duration-fast',
          !dragging && !disabled && 'border-rule text-smoke hover:border-signal-alt hover:text-signal-alt',
          dragging  && 'border-signal-alt bg-[color-mix(in_srgb,var(--color-signal-alt)_6%,var(--color-paper))] text-signal-alt',
          disabled  && 'border-rule text-smoke opacity-50 cursor-not-allowed',
          'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt focus-visible:ring-offset-0',
        )}
      >
        <UploadIcon />
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-smoke">{hint}</p>}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onInputChange}
          className="sr-only"
          tabIndex={-1}
        />
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <ul className="flex flex-col gap-1" role="alert">
          {errors.map((err, i) => (
            <li key={i} className="text-xs text-signal flex items-start gap-1.5">
              <span aria-hidden="true">•</span> {err}
            </li>
          ))}
        </ul>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col divide-y divide-rule border border-rule rounded-sm overflow-hidden" aria-label="Selected files">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center gap-3 px-3 py-2 bg-paper">
              <span className="text-smoke shrink-0"><FileIcon /></span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm text-void truncate">{file.name}</span>
                <span className="text-xs text-smoke">{getFileExtension(file)} — {formatBytes(file.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className={cn(
                  'shrink-0 text-smoke hover:text-signal transition-colors duration-fast',
                  'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt rounded-sm',
                )}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
