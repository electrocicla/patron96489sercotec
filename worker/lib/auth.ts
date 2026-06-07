import { unauthorized } from "./errors";

export const getBearerToken = (request: Request) => {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim();
};

export const requireAdminToken = (request: Request, expectedToken: string) => {
  const token = getBearerToken(request);
  if (!token || token !== expectedToken) {
    throw unauthorized();
  }
};
