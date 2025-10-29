import React, { useState, useEffect } from 'react';
import type { TicketFormData, TicketFormProps, TicketStatus, TicketPriority } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { validateTicketTitle, validateTicketStatus } from '../../utils/validation';

export const TicketForm: React.FC<TicketFormProps> = ({ ticket, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority
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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ 
      ...formData, 
      status: e.target.value as TicketStatus 
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ 
      ...formData, 
      priority: e.target.value as TicketPriority 
    });
  };

  return (
    <div className="bg-[#0B0B12] p-4 sm:p-6 rounded-xl shadow-lg mb-6 sm:mb-8">
      <h3 className="text-xl sm:text-2xl font-bold text-[#9CA3AF] mb-4 sm:mb-6">
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
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm sm:text-base"
            rows={3}
            placeholder="Enter ticket description"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={handleStatusChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm sm:text-base"
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
              onChange={handlePriorityChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm sm:text-base"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <Button 
            type="submit" 
            variant="primary"
            className="w-full sm:w-auto justify-center py-3 text-base sm:text-lg"
          >
            {ticket ? 'Update Ticket' : 'Create Ticket'}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
            className="w-full sm:w-auto justify-center py-3 text-base sm:text-lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};