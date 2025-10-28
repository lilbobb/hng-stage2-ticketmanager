import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import type { Ticket } from '../../types';
import { TicketCard } from './TicketCard';

interface TicketListProps {
  tickets: Ticket[];
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = useMemo(() => {
    if (!searchQuery.trim()) {
      return tickets;
    }

    const query = searchQuery.toLowerCase().trim();
    return tickets.filter(ticket => 
      ticket.title.toLowerCase().includes(query) ||
      (ticket.description && ticket.description.toLowerCase().includes(query)) ||
      ticket.status.toLowerCase().includes(query) ||
      (ticket.priority && ticket.priority.toLowerCase().includes(query))
    );
  }, [tickets, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div>
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by title or description..."
            className="w-full pl-10 pr-10 py-3 border border-gray-500 rounded-lg focus:border-gray-900 text-gray-200 placeholder-gray-500 transition"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600">
            Found {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}
      </div>

      {filteredTickets.length === 0 && !searchQuery && (
        <div className="p-12 rounded-xl shadow-sm border border-gray-400 text-center">
          <p className="text-gray-500 text-lg">
            No tickets found. Create your first ticket to get started!
          </p>
        </div>
      )}

      {filteredTickets.length === 0 && searchQuery && (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
          <p className="text-gray-500 text-lg">
            No tickets found for "{searchQuery}"
          </p>
          <button 
            onClick={clearSearch}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Clear Search
          </button>
        </div>
      )}

      {filteredTickets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};