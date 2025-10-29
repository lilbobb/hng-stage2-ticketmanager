export interface User {
  email: string;
  token: string;
}

export type TicketStatus = "open" | "in_progress" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
}

export type TicketFormData = Omit<Ticket, "id" | "createdAt">;

export interface TicketFormProps {
  ticket?: Ticket | null;
  onSubmit: (data: TicketFormData) => void;
  onCancel: () => void;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface PageProps {
  showForm?: boolean;
  ticketId?: string;
}

export interface NavigationState {
  page: string;
  props?: PageProps;
}
