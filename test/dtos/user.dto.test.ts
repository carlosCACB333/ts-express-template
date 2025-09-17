import { CreateUserDto } from '@/dtos/users.dto';
import { describe, expect, it } from 'vitest';

describe('CreateUserDto', () => {
  it('should have required properties', () => {
    const dto = new CreateUserDto();
    expect(dto).toHaveProperty('name');
    expect(dto).toHaveProperty('email');
    expect(dto).toHaveProperty('password');
  });

  it('should accept valid data', () => {
    const dto = new CreateUserDto();

    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const password = 'securePassword123';

    dto.name = name;
    dto.email = email;
    dto.password = password;

    expect(dto.name).toBe(name);
    expect(dto.email).toBe(email);
    expect(dto.password).toBe(password);
  });
});
