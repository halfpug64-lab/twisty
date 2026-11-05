// Phone-app runtime: stands in for the claude.ai page runtime when Studyhall runs from GitHub Pages.
// AI goes through the viewer's own key (Claude API or Google Gemini); sets stay on this device.
(() => {
  if (window.claude) return;
  const CFG = 'studyhall.ai';
  const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
  const readCfg = () => { try { return JSON.parse(localStorage.getItem(CFG)) || {}; } catch { return {}; } };
  const fail = (code, message, text) => ({ code, message, ...(text ? { text } : {}) });
  const b64 = blob => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1]); r.onerror = no; r.readAsDataURL(blob); });

  let sdk = null;
  async function askClaude(prompt, o, c) {
    sdk ||= import('./anthropic-sdk.js');
    const { Anthropic } = await sdk;
    const client = new Anthropic({ apiKey: c.key, dangerouslyAllowBrowser: true, maxRetries: 1 });
    const content = [];
    for (const b of o.images || []) content.push({ type: 'image', source: { type: 'base64', media_type: IMAGE_TYPES.includes(b.type) ? b.type : 'image/jpeg', data: await b64(b) } });
    content.push({ type: 'text', text: prompt });
    let text = '';
    try {
      const stream = client.beta.messages.stream({
        model: c.model || 'claude-opus-5-5',
        max_tokens: 32000,
        output_config: { effort: o.modelTier === 'quick' ? 'low' : 'medium' },
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        messages: [{ role: 'user', content }]
      }, { signal: o.signal });
      stream.on('text', delta => { text += delta; o.onText?.({ text, delta }); });
      const msg = await stream.finalMessage();
      if (msg.stop_reason === 'refusal') throw fail('refused', 'Claude declined this request.');
      text = msg.content.filter(b => b.type === 'text').map(b => b.text).join('');
      return { text, truncated: msg.stop_reason === 'max_tokens' };
    } catch (e) {
      if (e?.code) throw e;
      if (o.signal?.aborted || e instanceof Anthropic.APIUserAbortError) throw fail('cancelled', 'Stopped.', text);
      if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) throw fail('bad_key', e.message);
      if (e instanceof Anthropic.NotFoundError) throw fail('bad_model', e.message);
      if (e instanceof Anthropic.RateLimitError) throw fail('rate_limited', e.message, text);
      if (e instanceof Anthropic.BadRequestError) throw fail(/too long|too large|prompt is too/i.test(e.message) ? 'prompt_too_large' : 'upstream_error', e.message);
      throw fail('upstream_error', e?.message || 'Network error', text);
    }
  }

  async function askGemini(prompt, o, c) {
    const model = c.model || 'gemini-flash-latest';
    const parts = [];
    for (const b of o.images || []) parts.push({ inline_data: { mime_type: IMAGE_TYPES.includes(b.type) ? b.type : 'image/jpeg', data: await b64(b) } });
    parts.push({ text: prompt });
    let r;
    try {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST', signal: o.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': c.key },
        body: JSON.stringify({ contents: [{ role: 'user', parts }], generationConfig: { maxOutputTokens: 32000, ...(o.json ? { responseMimeType: 'application/json' } : {}) } })
      });
    } catch { throw o.signal?.aborted ? fail('cancelled', 'Stopped.') : fail('upstream_error', 'Could not reach Gemini.'); }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const m = j.error?.message || `Error ${r.status}`;
      if (r.status === 429) throw fail('rate_limited', m);
      if (r.status === 404) throw fail('bad_model', m);
      if (r.status === 401 || r.status === 403 || /api key/i.test(m)) throw fail('bad_key', m);
      throw fail('upstream_error', m);
    }
    const cand = j.candidates?.[0];
    if (!cand && j.promptFeedback?.blockReason) throw fail('refused', 'Gemini declined this request.');
    const text = (cand?.content?.parts || []).map(p => p.text || '').join('');
    o.onText?.({ text, delta: text });
    return { text, truncated: cand?.finishReason === 'MAX_TOKENS' };
  }

  async function sample(input, o = {}) {
    const c = readCfg();
    if (!c.key) throw fail('no_key', 'No AI key');
    const prompt = Array.isArray(input) ? input.map(t => t.content).join('\n\n') : String(input);
    const res = await (c.provider === 'gemini' ? askGemini : askClaude)(prompt, o, c);
    if (!res.text.trim()) throw fail('empty_completion', 'Empty answer');
    return res;
  }
  sample.json = async (input, o = {}) => {
    const { text, truncated } = await sample(input, { ...o, json: true });
    if (truncated) throw fail('invalid_json', 'Answer was cut off', text);
    const tries = [text, text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]];
    const a = text.search(/[\[{]/), b = Math.max(text.lastIndexOf('}'), text.lastIndexOf(']'));
    if (a >= 0 && b > a) tries.push(text.slice(a, b + 1));
    for (const t of tries) { if (t == null) continue; try { return JSON.parse(t); } catch {} }
    throw fail('invalid_json', 'Answer was not JSON', text);
  };
  sample.limits = async () => ({ maxPromptBytes: 262144, images: { maxCount: 10, maxInputBytes: 20 * 1024 * 1024, mediaTypes: IMAGE_TYPES } });

  const downloads = {
    async save({ filename, data }) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type: 'application/json' }));
      a.download = filename; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      return { saved: true };
    }
  };
  window.claude = { use: async name => ({ sample, downloads })[name] ?? null };

  /* AI settings screen */
  function openAiSettings() {
    const c = readCfg();
    const o = document.createElement('div'); o.className = 'overlay';
    o.innerHTML = `<form class="modal" role="dialog" aria-modal="true" aria-labelledby="aiTitle">
      <h2 id="aiTitle">AI settings</h2>
      <p class="muted small">The phone app can't use your claude.ai account, so it runs on an API key you paste here. The key stays on this phone and only goes to the company you pick.</p>
      <label class="field">AI to use
        <select id="aiProvider">
          <option value="claude">Claude (Anthropic API key, paid per use)</option>
          <option value="gemini">Google Gemini (free key)</option>
        </select></label>
      <label class="field">API key <input type="password" id="aiKey" autocomplete="off" placeholder="Paste your key"></label>
      <label class="field">Model <span class="muted small">(optional)</span> <input type="text" id="aiModel" autocomplete="off"></label>
      <p class="muted small" id="aiHelp"></p>
      <div class="row" style="justify-content:flex-end">
        ${c.key ? '<button type="button" class="btn ghost" id="aiClear">Remove key</button>' : ''}
        <button type="button" class="btn" id="aiCancel">Cancel</button>
        <button type="submit" class="btn primary">Save</button>
      </div></form>`;
    document.body.appendChild(o);
    const $ = s => o.querySelector(s);
    const help = {
      claude: ['claude-opus-5-5', 'Get a key at console.anthropic.com: sign in, open API Keys, and create one. You pay per use, separate from any Claude subscription. Making a big set costs roughly a few cents to a dollar.'],
      gemini: ['gemini-flash-latest', 'Get a free key at aistudio.google.com: sign in and choose "Get API key". The free tier has daily limits, and Google may use free-tier requests to improve its products.']
    };
    const sync = () => { const [m, t] = help[$('#aiProvider').value]; $('#aiModel').placeholder = m; $('#aiHelp').textContent = t; };
    $('#aiProvider').value = c.provider || 'claude'; $('#aiKey').value = c.key || ''; $('#aiModel').value = c.model || '';
    $('#aiProvider').onchange = sync; sync();
    const close = () => o.remove();
    $('#aiCancel').onclick = close;
    o.onclick = e => { if (e.target === o) close(); };
    if ($('#aiClear')) $('#aiClear').onclick = () => { try { localStorage.removeItem(CFG); } catch {} close(); toastMsg('Key removed'); };
    $('form').onsubmit = e => {
      e.preventDefault();
      try { localStorage.setItem(CFG, JSON.stringify({ provider: $('#aiProvider').value, key: $('#aiKey').value.trim(), model: $('#aiModel').value.trim() })); }
      catch { return toastMsg('Could not save the key on this phone.'); }
      close(); toastMsg($('#aiKey').value.trim() ? 'AI settings saved' : 'Key removed');
    };
    $('#aiKey').focus();
  }
  function toastMsg(m) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 3000); }
  window.studyhallAiSettings = openAiSettings;
  document.addEventListener('DOMContentLoaded', () => {
    const note = document.getElementById('saveNote');
    if (!note) return;
    const b = document.createElement('button');
    b.className = 'btn sm'; b.id = 'aiBtn'; b.textContent = 'AI settings'; b.onclick = openAiSettings;
    const wrap = document.createElement('div'); wrap.className = 'row'; wrap.style.gap = '10px';
    note.replaceWith(wrap); wrap.append(note, b);
    if (!readCfg().key) setTimeout(() => toastMsg('Tap AI settings to add your AI key.'), 600);
  });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
