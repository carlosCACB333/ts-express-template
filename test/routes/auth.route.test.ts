import { AuthRoute } from '@/routes/auth.route';
import { Container } from 'typedi';
import { beforeAll, describe, expect, it, vi } from 'vitest';

describe('AuthRoute', () => {
  beforeAll(() => {
    const mockService = {};
    vi.spyOn(Container, 'get').mockReturnValue(mockService);
  });

  it('should have /auth/signup and /auth/login routes registered', () => {
    const route = new AuthRoute();
    const stack = route.router.stack.map((layer: any) => layer.route?.path);
    expect(stack).toContain('/auth/signup');
    expect(stack).toContain('/auth/login');
  });
});
