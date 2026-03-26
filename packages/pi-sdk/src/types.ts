export interface PiUser {
  uid: string;
  username: string;
}

export interface PiAuthResult {
  user: PiUser;
  accessToken: string;
}

export type PiPaymentStatus =
  | "created"
  | "submitted"
  | "developer_approved"
  | "developer_completed"
  | "cancelled"
  | "revoked";

export interface PiPayment {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Record<string, unknown>;
  from_address: string;
  to_address: string;
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  transaction: {
    txid: string;
    verified: boolean;
    _link: string;
  } | null;
  created_at: string;
}
