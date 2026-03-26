import type { PiPayment } from "./types";

interface PiClientConfig {
  apiKey: string;
  baseUrl?: string;
}

export class PiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: PiClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? "https://api.minepi.com/v2";
  }

  private headers(): Record<string, string> {
    return {
      Authorization: `Key ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async approvePayment(paymentId: string): Promise<PiPayment> {
    const res = await fetch(
      `${this.baseUrl}/payments/${paymentId}/approve`,
      { method: "POST", headers: this.headers() },
    );
    if (!res.ok) throw new Error(`Pi API error: ${res.status}`);
    return res.json() as Promise<PiPayment>;
  }

  async completePayment(
    paymentId: string,
    txid: string,
  ): Promise<PiPayment> {
    const res = await fetch(
      `${this.baseUrl}/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify({ txid }),
      },
    );
    if (!res.ok) throw new Error(`Pi API error: ${res.status}`);
    return res.json() as Promise<PiPayment>;
  }

  async getPayment(paymentId: string): Promise<PiPayment> {
    const res = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`Pi API error: ${res.status}`);
    return res.json() as Promise<PiPayment>;
  }
}
