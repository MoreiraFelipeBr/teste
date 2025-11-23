/* script.js
  - scroll reveal (comportamento mantido do original)
  - cleanup de conexões (pagehide) com placeholder para WebSocket
*/

(function(){
  // Scroll reveal
  function handleScrollReveal() {
    const elems = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    elems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('load', handleScrollReveal);
  window.addEventListener('scroll', handleScrollReveal);
  window.addEventListener('resize', handleScrollReveal);

  // WebSocket cleanup placeholder (igual ao useEffect do Next)
  let socket = null; // se você usar WebSocket, atribua aqui.

  function handlePageHide() {
    if (socket && socket.close) {
      try { socket.close(); } catch(e){ /* ignore */ }
    }
  }
  window.addEventListener('pagehide', handlePageHide);
  window.addEventListener('beforeunload', handlePageHide);

  // Progressive enhancement: make images load nicely
  document.addEventListener('DOMContentLoaded', () => {
    // ensure reveal run again after images loaded
    const imgs = Array.from(document.images);
    let loaded = 0;
    if (imgs.length === 0) handleScrollReveal();
    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === imgs.length) handleScrollReveal();
        });
      }
    });
  });
})();
