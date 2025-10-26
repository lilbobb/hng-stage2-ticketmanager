import type { Ticket } from '../types';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import { generateId } from '../utils/helpers';

export const ticketService = {
  getAll: (): Ticket[] => {
    return getFromStorage<Ticket[]>(STORAGE_KEYS.TICKETS) || [];
  },

  create: (ticketData: Omit<Ticket, 'id' | 'createdAt'>): Ticket => {
    const tickets = ticketService.getAll();
    const newTicket: Ticket = {
      id: generateId('ticket'),
      ...ticketData,
      createdAt: new Date().toISOString()
    };
    saveToStorage(STORAGE_KEYS.TICKETS, [...tickets, newTicket]);
    return newTicket;
  },

  update: (id: string, ticketData: Partial<Ticket>): Ticket | null => {
    const tickets = ticketService.getAll();
    const index = tickets.findIndex(t => t.id === id);
    
    if (index === -1) return null;
    
    tickets[index] = { ...tickets[index], ...ticketData };
    saveToStorage(STORAGE_KEYS.TICKETS, tickets);
    return tickets[index];
  },

  delete: (id: string): boolean => {
    const tickets = ticketService.getAll();
    const filtered = tickets.filter(t => t.id !== id);
    
    if (filtered.length === tickets.length) return false;
    
    saveToStorage(STORAGE_KEYS.TICKETS, filtered);
    return true;
  },

  getStats: () => {
    const tickets = ticketService.getAll();
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };
  }
};