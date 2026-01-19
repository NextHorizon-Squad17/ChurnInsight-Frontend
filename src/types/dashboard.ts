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
  sentiment: 'happy' | 'sad';
  prediction?: number;
  riskLevel?: string;
  retentionStrategy?: string;
}

// --- INTEGRAÇÃO COM IA (NOVO) ---

export interface PredictionRequest {
  Gender: "Male" | "Female";
  SeniorCitizen: number;
  Partner: "Yes" | "No";
  Dependents: "Yes" | "No";
  TenureMonths: number;
  PhoneService: "Yes" | "No";
  MultipleLines: "Yes" | "No" | "No phone service";
  InternetService: "DSL" | "Fiber optic" | "No";
  OnlineSecurity: "Yes" | "No" | "No internet service";
  OnlineBackup: "Yes" | "No" | "No internet service";
  DeviceProtection: "Yes" | "No" | "No internet service";
  TechSupport: "Yes" | "No" | "No internet service";
  StreamingTV: "Yes" | "No" | "No internet service";
  StreamingMovies: "Yes" | "No" | "No internet service";
  Contract: "Month-to-month" | "One year" | "Two year";
  PaperlessBilling: "Yes" | "No";
  PaymentMethod: "Electronic check" | "Mailed check" | "Bank transfer (automatic)" | "Credit card (automatic)";
  MonthlyCharges: number;
  TotalCharges: number;
}

export interface PredictionResponse {
  prediction: number;
  probability: number;
  risk_level: "BAIXO" | "MÉDIO" | "ALTO";
  retention_strategy: string;
}