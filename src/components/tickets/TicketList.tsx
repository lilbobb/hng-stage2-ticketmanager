import React from 'react';
import type { Ticket } from '../../types';
import { TicketCard } from './TicketCard';

interface TicketListProps {
  tickets: Ticket[];
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, onEdit, onDelete }) => {
  if (tickets.length === 0) {
    return (
      <div className="bg-[#0B0B12] p-12 rounded-xl shadow-lg text-center">
        <p className="text-gray-500 text-lg">
          No tickets found. Create your first ticket to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};