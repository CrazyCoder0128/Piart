export const constants = {
  APP_NAME: "PiArt Exchange",
  MAX_UPLOAD_SIZE_MB: 50,
  SUPPORTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
  TOKEN_EXPIRY: "15m",
  REFRESH_TOKEN_EXPIRY: "7d",
  PAGINATION_DEFAULT_LIMIT: 20,
  PAGINATION_MAX_LIMIT: 100,
} as const;
