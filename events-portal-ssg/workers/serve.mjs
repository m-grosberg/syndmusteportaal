// Haldusvaate HTML-faili ei ole: /admin ei ole eelrenderdatud. Need teed saavad
// React Routeri tühja kesta, mille järel clientLoader andmed brauseris laeb.
export default {
  async fetch(request, env) {
    const shellUrl = new URL("/__spa-fallback", request.url);
    return env.ASSETS.fetch(new Request(shellUrl, request));
  },
};