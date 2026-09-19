interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY: string;
}

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

const reply = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: jsonHeaders });

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return reply({ ok: false }, 405);
  }

  const origin = request.headers.get('Origin');
  const requestOrigin = new URL(request.url).origin;
  if (origin !== requestOrigin) {
    return reply({ ok: false }, 403);
  }

  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return reply({ ok: false }, 415);
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return reply({ ok: false }, 400);
  }

  // This field is visually hidden. Real visitors leave it empty.
  if (clean(data.website)) {
    return reply({ ok: true });
  }

  const name = clean(data.name);
  const email = clean(data.email);
  const message = clean(data.message);

  if (!name || name.length > 80 || !isEmail(email) || !message || message.length > 5000) {
    return reply({ ok: false, reason: 'invalid' }, 400);
  }

  const receivedAt = new Date().toISOString();
  const body = [
    'LennyxCREW Contactから新しいメッセージが届きました。',
    '',
    `呼ばれたい名前: ${name}`,
    `メールアドレス: ${email}`,
    '',
    'メッセージ:',
    message,
    '',
    `受信日時 (UTC): ${receivedAt}`,
  ].join('\n');

  try {
    if (!env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LennyxCREW Contact <contact@send.lennyxcrew.com>',
        to: ['hello@lennyxcrew.com'],
        reply_to: email,
        subject: `【LennyxCREW Contact】${name}さんからのメッセージ`,
        text: body,
      }),
    });

    if (!resendResponse.ok) {
      throw new Error(`Resend returned ${resendResponse.status}`);
    }

    return reply({ ok: true });
  } catch (error) {
    console.error('Contact email delivery failed', error);
    return reply({ ok: false }, 502);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
