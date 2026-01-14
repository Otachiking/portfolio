'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface Contributor {
  id: string;
  name: string;
  role?: string;
  linkedin?: string;
  photo?: string;
}

interface AvatarProps {
  contributor: Contributor;
  size?: 'sm' | 'md' | 'lg';
  showPopover?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  contributor,
  size = 'md',
  showPopover = true,
}: AvatarProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const hasPhoto = contributor.photo && !imageError;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsPopoverOpen(false);
        triggerRef.current?.focus();
      }
    }

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPopoverOpen]);

  const handleClick = () => {
    if (contributor.linkedin) {
      window.open(contributor.linkedin, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const avatarContent = hasPhoto ? (
    <img
      src={contributor.photo}
      alt={contributor.name}
      className="h-full w-full object-cover"
      onError={() => setImageError(true)}
    />
  ) : (
    <span className="font-semibold text-white" aria-hidden="true">
      {getInitials(contributor.name)}
    </span>
  );

  if (!showPopover) {
    return (
      <div
        className={clsx(
          'relative flex items-center justify-center overflow-hidden bg-secondary',
          sizeStyles[size]
        )}
        title={contributor.name}
      >
        {avatarContent}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={clsx(
          'relative flex items-center justify-center overflow-hidden bg-secondary transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          sizeStyles[size]
        )}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
        onFocus={() => setIsPopoverOpen(true)}
        onBlur={() => setIsPopoverOpen(false)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`${contributor.name}${contributor.linkedin ? ', click to view LinkedIn profile' : ''}`}
        aria-describedby={isPopoverOpen ? `popover-${contributor.id}` : undefined}
      >
        {avatarContent}
      </button>

      {isPopoverOpen && (
        <div
          ref={popoverRef}
          id={`popover-${contributor.id}`}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap border border-text/10 bg-card-bg p-3 shadow-lg"
        >
          <p className="font-semibold">{contributor.name}</p>
          {contributor.role && (
            <p className="text-sm text-text/70">{contributor.role}</p>
          )}
          {contributor.linkedin && (
            <p className="mt-1 text-xs text-primary">Click to view LinkedIn ↗</p>
          )}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-card-bg" />
        </div>
      )}
    </div>
  );
}
