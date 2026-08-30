import { onRequest } from "./_middleware";

interface PagesWorkerEnv {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  [key: string]: unknown;
}

export default {
  async fetch(request: Request, env: PagesWorkerEnv, context: ExecutionContext): Promise<Response> {
    return onRequest({
      request,
      env,
      waitUntil: context.waitUntil.bind(context),
      passThroughOnException: context.passThroughOnException.bind(context),
      next: () => env.ASSETS.fetch(request),
      data: {},
    });
  },
};