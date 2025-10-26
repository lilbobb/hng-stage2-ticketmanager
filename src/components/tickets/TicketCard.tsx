import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Ticket } from '../../types';
import { formatDate, formatStatus } from '../../utils/helpers';

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 border-green-300';
      case 'in_progress': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-[#0B0B12] p-6 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-[#9CA3AF] flex-1">{ticket.title}</h3>
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onEdit(ticket)}
            className="p-2 text-[#9CA3AF] hover:bg-[#3B82F6] rounded-lg transition"
            title="Edit ticket"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(ticket.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete ticket"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {ticket.description && (
        <p className="text-[#9CA3AF] mb-4 line-clamp-3">{ticket.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ticket.status)}`}>
          {formatStatus(ticket.status)}
        </span>
        {ticket.priority && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        )}
      </div>

      <p className="text-sm text-[#9CA3AF]">
        Created: {formatDate(ticket.createdAt)}
      </p>
    </div>
  );
};