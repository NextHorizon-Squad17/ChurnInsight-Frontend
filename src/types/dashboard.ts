export interface DashboardData {
  churnScore: number;
  totalCustomers: number;
  accuracy: number;
  riskDistribution: number[];
}

export interface SelectedClient {
  id: number;
  name: string;
  avatarUrl: string;
  riskScore: number;
  sentiment: 'happy' | 'neutral' | 'sad';
}

export interface PredictionRequest {
  Gender: string;
  SeniorCitizen: number;
  Partner: string;
  Dependents: string;
  TenureMonths: number;
  PhoneService: string;
  MultipleLines: string;
  InternetService: string;
  OnlineSecurity: string;
  OnlineBackup: string;
  DeviceProtection: string;
  TechSupport: string;
  StreamingTV: string;
  StreamingMovies: string;
  Contract: string;
  PaperlessBilling: string;
  PaymentMethod: string;
  MonthlyCharges: number;
  TotalCharges: number;
}

export interface PredictionResponse {
  prediction: number;
  probability: number;
  risk_level: "BAIXO" | "MÉDIO" | "ALTO";
  retention_strategy: string;
}