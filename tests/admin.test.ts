import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server.js';
import { POST as loginHandler } from '../app/api/login/route.ts';
import { middleware } from '../middleware.ts';

test('authenticated users can load the admin page', async () => {
  const loginRequest = new Request('http://localhost/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'password' }),
  });

  const loginResponse = await loginHandler(loginRequest);
  assert.equal(loginResponse.status, 200, 'login should succeed with valid credentials');

  const cookie = loginResponse.cookies.get('user');
  assert.ok(cookie?.value, 'login response should set the session cookie');

  const adminRequest = new NextRequest('http://localhost/admin', {
    headers: { cookie: `user=${cookie.value}` },
  });

  const adminResponse = await middleware(adminRequest);
  assert.ok(adminResponse, 'middleware should return a response');
  assert.equal(adminResponse.status, 200, 'admin access should be allowed when authenticated');
});

test('middleware redirects to login when token verification fails', async () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
  Object.defineProperty(globalThis, 'crypto', {
    value: undefined,
    configurable: true,
    writable: true,
  });

  try {
    const request = new NextRequest('http://localhost/admin', {
      headers: { cookie: 'user=any-token' },
    });

    const response = await middleware(request);
    assert.ok(response, 'middleware should return a response when verification fails');
    assert.equal(response.status, 307, 'middleware should redirect to login on verification failure');
    assert.equal(
      response.headers.get('location'),
      'http://localhost/admin/login',
      'middleware should redirect to the login page',
    );
  } finally {
    if (originalDescriptor) {
      Object.defineProperty(globalThis, 'crypto', originalDescriptor);
    }
  }
});
