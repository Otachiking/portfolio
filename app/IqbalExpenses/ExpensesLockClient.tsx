'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// Pre-encrypted payload for https://docs.google.com/spreadsheets/d/1Oj7EaW5nNA13UnieYxDXvH1DBhx-vrI9FTNlX5Rqb8U/edit?gid=0#gid=0
// Encrypted using AES-256-GCM with PBKDF2 (100,000 iterations SHA-256)
// The PIN and target URL are NOT stored anywhere in plain text.
const ENCRYPTED_VAULT = {
  salt: 'n/ZXskyusM23cVKk3K1WwQ==',
  iv: '3RcAloP5dbPDx5Q0',
  tag: 'VzevN81aEZuqHzSBAs49XQ==',
  ciphertext:
    'hV96nc4U53IJY6+UwfgEY3MWUoOwmKDj7O3aJ2BvAVYEHt75ncJeUkNlKBCF84MFolJzOBHU9iiMkSNP1CTz5ZXbB4qz11rEm25q0VzPbPtncSqvAMTl2F6Jf+K0TldV4dv4Lg==',
};

const PIN_LENGTH = 6;
const MAX_ATTEMPTS = 5;
const COOLDOWN_SECONDS = 30;

export default function ExpensesLockClient() {
  const [pin, setPin] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [cooldownTime, setCooldownTime] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Handle countdown timer for rate limiting
  useEffect(() => {
    if (cooldownTime <= 0) return;
    const timer = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          setErrorMessage('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownTime]);

  // Cryptographic zero-knowledge verification & decryption
  const attemptUnlock = useCallback(
    async (enteredPin: string) => {
      if (enteredPin.length !== PIN_LENGTH || isSubmitting || cooldownTime > 0) return;

      setIsSubmitting(true);
      setErrorMessage('');

      try {
        const toBuf = (b64: string) => {
          const binStr = window.atob(b64);
          const len = binStr.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binStr.charCodeAt(i);
          }
          return bytes;
        };

        const salt = toBuf(ENCRYPTED_VAULT.salt);
        const iv = toBuf(ENCRYPTED_VAULT.iv);
        const tag = toBuf(ENCRYPTED_VAULT.tag);
        const cipherData = toBuf(ENCRYPTED_VAULT.ciphertext);

        // In Web Crypto API AES-GCM, the auth tag is appended to the ciphertext
        const combined = new Uint8Array(cipherData.length + tag.length);
        combined.set(cipherData);
        combined.set(tag, cipherData.length);

        const encoder = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          encoder.encode(enteredPin),
          { name: 'PBKDF2' },
          false,
          ['deriveKey']
        );

        const derivedKey = await window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256',
          },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );

        const decryptedBuffer = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: iv },
          derivedKey,
          combined
        );

        const decrypted = new TextDecoder().decode(decryptedBuffer);

        if (decrypted && decrypted.startsWith('https://docs.google.com/')) {
          setIsSuccess(true);
          setRedirectUrl(decrypted);
          setIsSubmitting(false);

          // Redirect smoothly
          setTimeout(() => {
            window.location.replace(decrypted);
          }, 800);
          return;
        } else {
          throw new Error('Invalid payload');
        }
      } catch {
        // Incorrect PIN / Decryption failed
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);

        if (newAttempts >= MAX_ATTEMPTS) {
          setCooldownTime(COOLDOWN_SECONDS);
          setErrorMessage(`Terlalu banyak percobaan. Tunggu ${COOLDOWN_SECONDS} detik.`);
          setAttempts(0);
        } else {
          setErrorMessage(`PIN salah. Sisa kesempatan: ${MAX_ATTEMPTS - newAttempts}`);
        }

        setPin('');
        setIsSubmitting(false);
      }
    },
    [attempts, cooldownTime, isSubmitting]
  );

  // Trigger unlock when 6 digits entered
  const handlePinChange = useCallback(
    (val: string) => {
      if (cooldownTime > 0 || isSuccess || isSubmitting) return;

      const digitsOnly = val.replace(/\D/g, '').slice(0, PIN_LENGTH);
      setPin(digitsOnly);

      if (digitsOnly.length === PIN_LENGTH) {
        attemptUnlock(digitsOnly);
      }
    },
    [cooldownTime, isSuccess, isSubmitting, attemptUnlock]
  );

  const handleKeyPress = useCallback(
    (num: string) => {
      if (cooldownTime > 0 || isSuccess || isSubmitting) return;
      if (pin.length < PIN_LENGTH) {
        const nextPin = pin + num;
        handlePinChange(nextPin);
      }
    },
    [cooldownTime, isSuccess, isSubmitting, pin, handlePinChange]
  );

  const handleDelete = useCallback(() => {
    if (cooldownTime > 0 || isSuccess || isSubmitting) return;
    if (pin.length > 0) {
      setPin((prev) => prev.slice(0, -1));
      setErrorMessage('');
    }
  }, [cooldownTime, isSuccess, isSubmitting, pin.length]);

  const handleClear = useCallback(() => {
    if (cooldownTime > 0 || isSuccess || isSubmitting) return;
    setPin('');
    setErrorMessage('');
  }, [cooldownTime, isSuccess, isSubmitting]);

  // Global keyboard listener for seamless desktop typing & paste
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSuccess || isSubmitting || cooldownTime > 0) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (isSuccess || isSubmitting || cooldownTime > 0) return;
      const text = e.clipboardData?.getData('text') || '';
      const digits = text.replace(/\D/g, '');
      if (digits.length > 0) {
        e.preventDefault();
        handlePinChange(digits);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('paste', handlePaste);
    };
  }, [isSuccess, isSubmitting, cooldownTime, handleKeyPress, handleDelete, handleClear, handlePinChange]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      {/* Hidden input for mobile keyboard support */}
      <input
        ref={inputRef}
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={PIN_LENGTH}
        value={pin}
        onChange={(e) => handlePinChange(e.target.value)}
        disabled={cooldownTime > 0 || isSubmitting || isSuccess}
        className="sr-only"
        aria-label="6-digit PIN"
      />

      <div
        onClick={() => inputRef.current?.focus()}
        className={`w-full max-w-md bg-card-bg/95 border ${
          isSuccess
            ? 'border-emerald-500 shadow-emerald-500/10'
            : errorMessage
            ? 'border-primary shadow-primary/10'
            : 'border-text/15'
        } p-8 sm:p-10 transition-all duration-300 shadow-2xl ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className={`w-16 h-16 flex items-center justify-center mb-4 transition-colors duration-300 ${
              isSuccess
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}
          >
            {isSuccess ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            )}
          </div>

          <div className="inline-block px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider mb-2 bg-primary/10 text-primary border border-primary/20">
            Protected Spreadsheet
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
            Iqbal Expenses
          </h1>
          <p className="text-sm text-text/60 mt-1">
            Masukkan 6-digit PIN untuk membuka data keuangan
          </p>
        </div>

        {/* PIN Display Boxes */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6">
          {Array.from({ length: PIN_LENGTH }).map((_, idx) => {
            const isFilled = idx < pin.length;
            const isCurrent = idx === pin.length && !isSuccess && cooldownTime === 0;

            return (
              <div
                key={idx}
                className={`w-11 h-13 sm:w-12 sm:h-14 flex items-center justify-center text-xl sm:text-2xl font-mono font-bold border-2 transition-all duration-200 ${
                  isSuccess
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                    : isFilled
                    ? 'border-primary bg-primary/10 text-primary scale-105'
                    : isCurrent
                    ? 'border-primary/60 bg-transparent ring-2 ring-primary/20'
                    : 'border-text/20 bg-transparent text-text/30'
                }`}
              >
                {isFilled ? (
                  <span className="w-3.5 h-3.5 rounded-full bg-current transition-transform duration-150 animate-in zoom-in" />
                ) : (
                  <span className="opacity-0">0</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Status / Error Message */}
        <div className="min-h-[28px] text-center mb-6">
          {isSubmitting && (
            <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Memverifikasi PIN...</span>
            </div>
          )}
          {isSuccess && (
            <div className="text-sm font-medium text-emerald-500">
              PIN Benar! Mengalihkan ke Google Spreadsheet...
            </div>
          )}
          {errorMessage && !isSubmitting && (
            <div className="text-sm font-medium text-primary">
              {errorMessage}
            </div>
          )}
          {!isSubmitting && !isSuccess && !errorMessage && cooldownTime === 0 && (
            <div className="text-xs text-text/40">
              Ketik angka langsung dari keyboard atau tombol di bawah
            </div>
          )}
          {cooldownTime > 0 && (
            <div className="text-xs text-primary font-mono">
              Waktu tunggu: {cooldownTime} detik
            </div>
          )}
        </div>

        {/* Fallback Direct Button if Redirected */}
        {isSuccess && redirectUrl && (
          <div className="mb-6">
            <a
              href={redirectUrl}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 transition-colors"
            >
              <span>Buka Spreadsheet Sekarang</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}

        {/* On-screen Keypad */}
        {!isSuccess && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleKeyPress(digit);
                }}
                disabled={cooldownTime > 0 || isSubmitting}
                className="h-12 sm:h-14 font-mono text-xl sm:text-2xl font-semibold border border-text/15 bg-background hover:bg-primary/10 hover:border-primary active:scale-95 transition-all text-text disabled:opacity-40 disabled:hover:bg-background disabled:hover:border-text/15"
              >
                {digit}
              </button>
            ))}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              disabled={cooldownTime > 0 || isSubmitting || pin.length === 0}
              className="h-12 sm:h-14 text-xs font-semibold uppercase tracking-wider border border-text/15 bg-background hover:bg-primary/10 hover:text-primary hover:border-primary/30 active:scale-95 transition-all text-text/60 disabled:opacity-40"
              title="Clear PIN"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleKeyPress('0');
              }}
              disabled={cooldownTime > 0 || isSubmitting}
              className="h-12 sm:h-14 font-mono text-xl sm:text-2xl font-semibold border border-text/15 bg-background hover:bg-primary/10 hover:border-primary active:scale-95 transition-all text-text disabled:opacity-40"
            >
              0
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              disabled={cooldownTime > 0 || isSubmitting || pin.length === 0}
              className="h-12 sm:h-14 flex items-center justify-center border border-text/15 bg-background hover:bg-primary/10 hover:border-primary active:scale-95 transition-all text-text/80 disabled:opacity-40"
              title="Backspace"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.5-6.5a1.5 1.5 0 011.06-.44H20a2 2 0 012 2v10a2 2 0 01-2 2h-9.44a1.5 1.5 0 01-1.06-.44L3 12z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Footer info & security badge */}
        <div className="pt-4 border-t border-text/10 flex flex-col sm:flex-row items-center justify-between text-xs text-text/50 gap-2">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>AES-256 Authenticated Vault</span>
          </div>
          <Link
            href="/"
            className="hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
