import { useState, useEffect } from 'react';
import type { Ticket } from '../types';
import { ticketService } from '../services/ticketService';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTickets = () => {
    setLoading(true);
    const allTickets = ticketService.getAll();
    setTickets(allTickets);
    setLoading(false);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt'>) => {
    const newTicket = ticketService.create(ticketData);
    setTickets(prev => [...prev, newTicket]);
    return newTicket;
  };

  const updateTicket = (id: string, ticketData: Partial<Ticket>) => {
    const updated = ticketService.update(id, ticketData);
    if (updated) {
      setTickets(prev => prev.map(t => t.id === id ? updated : t));
    }
    return updated;
  };

  const deleteTicket = (id: string) => {
    const success = ticketService.delete(id);
    if (success) {
      setTickets(prev => prev.filter(t => t.id !== id));
    }
    return success;
  };

  const stats = ticketService.getStats();

  return {
    tickets,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    stats,
    reload: loadTickets
  };
};