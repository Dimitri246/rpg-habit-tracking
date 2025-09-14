import { PropsWithChildren } from 'react';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
