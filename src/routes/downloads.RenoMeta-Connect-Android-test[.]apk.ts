import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// The beta APK was renamed. Nitro's SSR function is mounted on /* and runs
// before netlify.toml redirects, so the old URL is redirected here instead.
const redirectToApk = async () =>
  new Response(null, {
    status: 301,
    headers: { Location: "/downloads/RenoMeta-Connect-Android.apk" },
  });

export const Route = createFileRoute("/downloads/RenoMeta-Connect-Android-test.apk")({
  server: {
    handlers: {
      GET: redirectToApk,
      HEAD: redirectToApk,
    },
  },
});
