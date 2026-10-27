import type { Metadata } from 'next';
import ExpensesLockClient from './ExpensesLockClient';

export const metadata: Metadata = {
  title: 'Iqbal Expenses | Protected',
  description: 'PIN protected access to private expense sheets.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function IqbalExpensesPage() {
  return <ExpensesLockClient />;
}
