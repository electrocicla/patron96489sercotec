export interface TurnstileClient {
  verify(token: string, remoteIp: string | null): Promise<boolean>;
}

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
}

export class CloudflareTurnstileClient implements TurnstileClient {
  constructor(private readonly secretKey: string) {}

  async verify(token: string, remoteIp: string | null): Promise<boolean> {
    const body = new FormData();
    body.set("secret", this.secretKey);
    body.set("response", token);
    if (remoteIp) {
      body.set("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body
    });

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as TurnstileResponse;
    return result.success === true;
  }
}
