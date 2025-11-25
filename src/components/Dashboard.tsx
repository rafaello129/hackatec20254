import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardContent } from './DashboardContent';

export function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <DashboardContent activeSection={activeSection} />
    </div>
  );
}
