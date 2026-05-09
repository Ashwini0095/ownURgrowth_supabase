/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/course-notes/linkedin-growth/download": [
      "./protected-assets/linkedin-course-notes.pdf",
    ],
  },
};

module.exports = nextConfig;
