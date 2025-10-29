import React, { useState } from 'react';
import { Layout } from '../layout/Layout';
import { Toast } from '../ui/Toast';
import { DeleteModal } from '../ui/DeleteModal';
import { TicketForm } from './TicketForm';
import { TicketList } from './TicketList';
import { useTickets } from '../../hooks/useTickets';
import { useToast } from '../../hooks/useToast';
import type { Ticket } from '../../types';

interface TicketManagementProps {
  onNavigate: (page: string) => void;
  initialShowForm?: boolean;
}

export const TicketManagement: React.FC<TicketManagementProps> = ({
  onNavigate,
  initialShowForm = false
}) => {
  const { tickets, createTicket, updateTicket, deleteTicket } = useTickets();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [showForm, setShowForm] = useState(initialShowForm);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    ticketId: string | null;
    ticketTitle: string;
  }>({
    isOpen: false,
    ticketId: null,
    ticketTitle: ''
  });

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

  const handleDeleteClick = (ticket: Ticket) => {
    setDeleteModal({
      isOpen: true,
      ticketId: ticket.id,
      ticketTitle: ticket.title || 'Untitled Ticket'
    });
  };

  const handleDeleteConfirm = () => {
    console.log('Delete confirmed for ticket ID:', deleteModal.ticketId);

    if (deleteModal.ticketId) {
      try {
        deleteTicket(deleteModal.ticketId);
        showSuccess('Ticket deleted successfully!');
        closeDeleteModal();
      } catch (error) {
        showError('Failed to delete ticket.');
        closeDeleteModal();
      }
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      ticketId: null,
      ticketTitle: ''
    });
  };

  const resetForm = () => {
    setEditingTicket(null);
    setShowForm(false);
  };

  return (
    <Layout onNavigate={onNavigate} showAuth>
      {toast && <Toast {...toast} onClose={hideToast} />}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Ticket"
        message={`Are you sure you want to delete "${deleteModal.ticketTitle || 'this ticket'}"? This action cannot be undone.`}
      />

      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#9CA3AF] text-center sm:text-left">
            Ticket Management
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-[#8B5CF6] text-white rounded-lg font-semibold hover:bg-[#3B82F6] transition-all duration-200 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showForm ? 'Cancel' : 'New Ticket'}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 sm:mb-8">
            <TicketForm
              ticket={editingTicket}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          </div>
        )}

        <TicketList
          tickets={tickets}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
    </Layout>
  );
};