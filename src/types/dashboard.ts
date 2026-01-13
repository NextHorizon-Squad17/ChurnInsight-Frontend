export interface DashboardData {
  churnScore: number;
  totalCustomers: number;
  accuracy: number;
  riskDistribution: number[];
}

// Interface para o cliente simulado
export interface SelectedClient {
  id: number;
  name: string;
  avatarUrl: string;
  riskScore: number;
  sentiment: 'happy' | 'neutral' | 'sad';
}