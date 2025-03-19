export interface AuthConfig {
  projectId: string;
  secretKey: string;
}

export interface TokenStore {
  accessToken: string;
  refreshToken: string;
}

export interface TeamData {
  id: string;
  display_name: string;
  profile_image_url?: string;
  client_metadata?: Record<string, unknown>;
  client_read_only_metadata?: Record<string, unknown>;
}

export interface StackUser {
  id: string;
  primary_email_verified: boolean;
  signed_up_at_millis: number;
  selected_team?: TeamData;
  primary_email: string;
  display_name: string;
  client_metadata?: Record<string, unknown>;
  client_read_only_metadata?: Record<string, unknown>;
  profile_image_url?: string;
  selected_team_id?: string;
}

export interface AuthResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
