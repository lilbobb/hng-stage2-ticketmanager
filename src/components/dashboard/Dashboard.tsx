import { Layout } from '../layout/Layout';
import { StatCard } from './StatCard';
import { Button } from '../ui/Button';
import { useTickets } from '../../hooks/useTickets';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { stats } = useTickets();

  return (
    <Layout onNavigate={onNavigate} showAuth>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
        <h2 className="text-3xl font-bold text-[#9CA3AF] mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard value={stats.total} label="Total Tickets" color="indigo" />
          <StatCard value={stats.open} label="Open Tickets" color="green" />
          <StatCard value={stats.inProgress} label="In Progress" color="amber" />
          <StatCard value={stats.closed} label="Closed Tickets" color="gray" />
        </div>

        <div className="bg-[#0B0B12] p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-[#EDEDED] mb-6">Quick Actions</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" onClick={() => onNavigate('tickets')}>
              Manage Tickets
            </Button>
            <Button variant="success" onClick={() => onNavigate('tickets')}>
              Create New Ticket
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};