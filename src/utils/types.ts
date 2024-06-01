import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';

export type InferRouteOutput = inferRouterOutputs<AppRouter>;

export type InferRouteInput = inferRouterInputs<AppRouter>;
