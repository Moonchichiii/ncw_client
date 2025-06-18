import { memo, useCallback } from 'react'
import type { CookieCategoryConfig } from '@/components/cookies/cookieCategories'
import type { CookieCategory } from '@/hooks/useCookieConsent'
import clsx from 'clsx'

interface CookieCategoryToggleProps {
  category: CookieCategoryConfig
  enabled: boolean
  onChange: (id: CookieCategory, enabled: boolean) => void
  disabled?: boolean
}

const ToggleButton = ({
  enabled,
  disabled,
  required,
  onClick,
  label,
}: {
  enabled: boolean
  disabled: boolean
  required: boolean
  onClick: () => void
  label: string
}) => (
  <button
    onClick={onClick}
    disabled={disabled || required}
    className={clsx(
      'relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2',
      enabled ? 'bg-interactive-primary' : 'bg-border-secondary',
      (disabled || required) && 'opacity-50 cursor-not-allowed'
    )}
    aria-label={label}
    aria-pressed={enabled}
    type="button"
    tabIndex={required ? -1 : 0}
  >
    <div
      className={clsx(
        'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
        enabled ? 'translate-x-6' : 'translate-x-0.5'
      )}
    />
  </button>
)

const CookieCategoryToggle = memo<CookieCategoryToggleProps>(({
  category,
  enabled,
  onChange,
  disabled = false
}) => {
  const handleToggle = useCallback(() => {
    if (!disabled) {
      onChange(category.id, !enabled)
    }
  }, [category.id, enabled, onChange, disabled])

  const Icon = category.icon

  return (
    <div className="p-6 bg-bg-elevated border border-border-primary rounded-xl hover:border-interactive-primary/50 transition-colors duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            category.required
              ? 'bg-status-info/10 text-status-info'
              : 'bg-interactive-primary/10 text-interactive-primary'
          )}>
            <Icon size={20} aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-text-primary">
            {category.name}
            {category.required && (
              <span className="ml-2 text-xs font-medium text-status-info bg-status-info/10 px-2 py-1 rounded">
                Required
              </span>
            )}
          </h3>
        </div>

        <ToggleButton
          enabled={enabled}
          disabled={disabled}
          required={category.required}
          onClick={handleToggle}
          label={`${enabled ? 'Disable' : 'Enable'} ${category.name} cookies`}
        />
      </div>

      <p className="text-text-secondary text-sm mb-3 leading-relaxed">
        {category.description}
      </p>
      <div className="text-xs text-text-tertiary">
        <span className="font-medium">Examples:</span> {category.examples.join(', ')}
      </div>
    </div>
  )
})

CookieCategoryToggle.displayName = 'CookieCategoryToggle'
export default CookieCategoryToggle
