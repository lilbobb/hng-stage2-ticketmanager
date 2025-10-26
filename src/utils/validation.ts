export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Email is invalid';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

export const validateTicketTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'Title is required';
  }
  if (title.length < 3) {
    return 'Title must be at least 3 characters';
  }
  return null;
};

export const validateTicketStatus = (status: string): string | null => {
  if (!['open', 'in_progress', 'closed'].includes(status)) {
    return 'Invalid status';
  }
  return null;
};