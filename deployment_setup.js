export const deploymentConfig = {
  frontend: {
    provider: "Vercel",
    command: "vercel --prod",
  },
  backend: {
    provider: "Render/AWS",
    setup: "Dockerized deployment",
  },
  database: {
    provider: "Firebase Firestore",
    security: "Rules enforced",
  },
};
