import { createRootRoute, Outlet } from "@tanstack/react-router";
import Layout from "@/components/layout/root-layout";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main">
      <div className="text-center">
        <h1 className="font-heading text-6xl font-bold text-text-strong">
          404
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-text-muted">
          Page not found
        </p>
        <a
          href="/"
          className="mt-8 inline-block bg-text-strong px-8 py-4 text-sm font-bold uppercase tracking-widest text-bg-main transition-colors hover:bg-text-accent hover:text-white"
        >
          Back to index
        </a>
      </div>
    </div>
  );
}