(function () {
  var measurementId = 'G-CW9KK630PE';

  if (window.gtag || document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', measurementId);
})();
