'use client';

import clsx from 'clsx';

interface PillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'tag';
  size?: 'sm' | 'md';
}

export function Pill({
  label,
  isActive = false,
  onClick,
  variant = 'default',
  size = 'md',
}: PillProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all border';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-4 py-1.5 text-sm',
  };

  const variantStyles = {
    default: clsx(
      isActive
        ? 'bg-primary text-white border-primary'
        : 'bg-transparent text-text border-text/20 hover:border-primary hover:text-primary'
    ),
    tag: 'bg-secondary/10 text-secondary border-secondary/20',
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant])}
        aria-pressed={variant === 'default' ? isActive : undefined}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={clsx(baseStyles, sizeStyles[size], variantStyles[variant])}>
      {label}
    </span>
  );
}
