// Type definitions for Facebook Pixel
declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      data?: Record<string, unknown>
    ) => void;
    _fbq?: Window["fbq"];
  }
}

export {};
