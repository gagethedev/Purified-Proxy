export default async function register() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/uv/sw.js')
        .then(function(registration) {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch(function(error) {
          console.error('Service Worker registration failed:', error);
        });
    });
  } else {
    console.log('Service Workers are not supported in this browser.');
  }
}