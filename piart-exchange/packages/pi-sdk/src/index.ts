export type PiPlatformClientOptions = {
  apiKey: string;
  baseUrl?: string;
};

export class PiPlatformClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(options: PiPlatformClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? "https://api.minepi.com/v2";
  }

  async healthCheck(): Promise<{ ok: boolean; baseUrl: string }> {
    return { ok: Boolean(this.apiKey), baseUrl: this.baseUrl };
  }
}
