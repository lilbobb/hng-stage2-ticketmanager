import React, { useState, useEffect } from 'react';
import type { Ticket } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { validateTicketTitle, validateTicketStatus } from '../../utils/validation';

interface TicketFormProps {
  ticket?: Ticket | null;
  onSubmit: (data: Omit<Ticket, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const TicketForm: React.FC<TicketFormProps> = ({ ticket, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open' as 'open' | 'in_progress' | 'closed',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority || 'medium'
      });
    }
  }, [ticket]);

  const validate = () => {
    const titleError = validateTicketTitle(formData.title);
    const statusError = validateTicketStatus(formData.status);
    
    setErrors({
      title: titleError || undefined,
      status: statusError || undefined
    });
    
    return !titleError && !statusError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-[#0B0B12] p-6 rounded-xl shadow-lg mb-8">
      <h3 className="text-2xl font-bold text-[#9CA3AF] mb-6">
        {ticket ? 'Edit Ticket' : 'Create New Ticket'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-[#737a88]">
        <Input
          type="text"
          label="Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          placeholder="Enter ticket title"
        />

        <div>
          <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            rows={4}
            placeholder="Enter ticket description"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="primary">
            {ticket ? 'Update Ticket' : 'Create Ticket'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};