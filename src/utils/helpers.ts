export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Date.now()}`;
};

export const formatStatus = (status: string): string => {
  return status.replace('_', ' ');
};