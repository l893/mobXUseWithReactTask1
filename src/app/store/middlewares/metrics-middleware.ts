import { isAction, type Middleware } from '@reduxjs/toolkit';

type MetricsEvent = {
  actionType: string;
  timestamp: number;
};

type GlobalWithMetrics = typeof globalThis & {
  __APP_METRICS__?: MetricsEvent[];
};

export const metricsMiddleware: Middleware =
  () => (next) => (action: unknown) => {
    const timestamp = Date.now();
    const actionType = isAction(action) ? action.type : 'unknown';

    const globalWithMetrics = globalThis as GlobalWithMetrics;
    globalWithMetrics.__APP_METRICS__ ??= [];
    globalWithMetrics.__APP_METRICS__.push({ actionType, timestamp });

    return next(action);
  };
