import type { FunctionsHttpError } from "@supabase/supabase-js";

/**
 * Supabase's functions.invoke() surfaces non-2xx responses as a
 * FunctionsHttpError whose `.message` is a generic "Edge Function returned a
 * non-2xx status code". The real error payload lives on `.context.response`.
 * This helper extracts a user-facing message from that body when possible.
 */
export async function readFunctionError(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): Promise<string> {
  try {
    const err = error as FunctionsHttpError & {
      context?: { response?: Response };
    };
    const response = err?.context?.response;
    if (response && typeof response.clone === "function") {
      const cloned = response.clone();
      const text = await cloned.text();
      if (text) {
        try {
          const json = JSON.parse(text);
          if (json?.error) return String(json.error);
          if (json?.message) return String(json.message);
        } catch {
          // Non-JSON body — return trimmed text if it looks like a message
          if (text.length < 200) return text;
        }
      }
      if (response.status === 429) {
        return "Too many requests. Please wait a moment and try again.";
      }
    }
    if (error instanceof Error && error.message && !/non-2xx/i.test(error.message)) {
      return error.message;
    }
  } catch {
    // fall through
  }
  return fallback;
}
