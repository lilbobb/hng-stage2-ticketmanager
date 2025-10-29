import { Layout } from '../layout/Layout';
import { StatCard } from './StatCard';
import { Button } from '../ui/Button';
import { useTickets } from '../../hooks/useTickets';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { stats } = useTickets();

  const handleCreateTicket = () => {
    onNavigate('tickets');
  };

  return (
    <Layout onNavigate={onNavigate} showAuth>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#9CA3AF]">Dashboard</h2>
          <p className="text-[#737a88] mt-2 text-sm sm:text-base">Overview of your ticket statistics</p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
          <StatCard value={stats.total} label="Total Tickets" color="indigo" />
          <StatCard value={stats.open} label="Open Tickets" color="green" />
          <StatCard value={stats.inProgress} label="In Progress" color="amber" />
          <StatCard value={stats.closed} label="Closed Tickets" color="gray" />
        </div>

        <div className="bg-[#0B0B12] p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#EDEDED] mb-2">Quick Actions</h3>
            <p className="text-[#737a88] text-sm sm:text-base">Manage your tickets efficiently</p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
            <Button
              variant="primary"
              onClick={() => onNavigate('tickets')}
              className="w-full xs:w-auto justify-center py-3 text-base sm:text-lg"
            >
              Manage Tickets
            </Button>
            <Button
              variant="success"
              onClick={handleCreateTicket}
              className="w-full xs:w-auto justify-center py-3 text-base sm:text-lg"
            >
              Create New Ticket
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};