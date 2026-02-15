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
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="text-center">
        <h1 className="font-heading text-6xl font-bold text-content">
          404
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-content-faint">
          Page not found
        </p>

        <a href="/" className="mt-8 btn-lime">
          Back to index
        </a>
      </div>
    </div>
  );
}
