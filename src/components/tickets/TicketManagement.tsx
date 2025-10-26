import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from '../layout/Layout';
import { Toast } from '../ui/Toast';
import { TicketForm } from './TicketForm';
import { TicketList } from './TicketList';
import { useTickets } from '../../hooks/useTickets';
import { useToast } from '../../hooks/useToast';
import type { Ticket } from '../../types';

interface TicketManagementProps {
  onNavigate: (page: string) => void;
}

export const TicketManagement: React.FC<TicketManagementProps> = ({ onNavigate }) => {
  const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const handleSubmit = (data: Omit<Ticket, 'id' | 'createdAt'>) => {
    try {
      if (editingTicket) {
        updateTicket(editingTicket.id, data);
        showSuccess('Ticket updated successfully!');
      } else {
        createTicket(data);
        showSuccess('Ticket created successfully!');
      }
      resetForm();
    } catch (error) {
      showError('An error occurred. Please try again.');
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        deleteTicket(id);
        showSuccess('Ticket deleted successfully!');
      } catch (error) {
        showError('Failed to delete ticket.');
      }
    }
  };

  const resetForm = () => {
    setEditingTicket(null);
    setShowForm(false);
  };

  return (
    <Layout onNavigate={onNavigate} showAuth>
      {toast && <Toast {...toast} onClose={hideToast} />}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b-gray-700 flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#9CA3AF]">Ticket Management</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-[#EDEDED] rounded-lg font-semibold hover:bg-[#3B82F6] transition"
          >
            <Plus size={20} />
            New Ticket
          </button>
        </div>

        {showForm && (
          <TicketForm
            ticket={editingTicket}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        )}

        <TicketList
          tickets={tickets}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
};