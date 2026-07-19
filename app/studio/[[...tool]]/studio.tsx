"use client";

import { NextStudio } from "next-sanity/studio";

import config, { projectId } from "../../../sanity.config";

export function Studio() {
  if (!projectId) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-h3 font-display text-ink-900">Studio not configured yet</h1>
          <p className="mt-3 max-w-md text-ink-500">
            Set NEXT_PUBLIC_SANITY_PROJECT_ID in the environment variables,
            then redeploy to activate the newsroom editor.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
