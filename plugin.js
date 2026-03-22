console.log('REPL plugin loaded');
penpot.ui.open('Penpot REPL', '', { width: 500, height: 400 });

penpot.ui.onMessage(msg => {
  if (msg.type === 'EVAL') {
    try {
      const fn = new Function('penpot', msg.code);
      const result = fn(penpot);
      const out = result === undefined ? 'undefined'
                : typeof result === 'object' ? JSON.stringify(result, null, 2)
                : String(result);
      penpot.ui.sendMessage({ type: 'RESULT', ok: true, out });
    } catch(e) {
      penpot.ui.sendMessage({ type: 'RESULT', ok: false, out: e.message });
    }
  }
});
