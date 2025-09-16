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

  const adminResponse = middleware(adminRequest);
  assert.ok(adminResponse, 'middleware should return a response');
  assert.equal(adminResponse.status, 200, 'admin access should be allowed when authenticated');
});
