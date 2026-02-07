import { redirect } from 'next/navigation';

export default function GivePage() {
  redirect('/giving');
  return null;
}
