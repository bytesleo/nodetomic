import { create } from 'apisauce';

const api = create({
  baseURL: host
});

describe('Dogs', () => {
  test('all dogs', async () => {
    const { status, data } = await api.get('/api/dogs/all');
    expect(200).toBe(status);
    expect([]).toEqual(data);
  });

  test('all dogs - logged', async () => {
    const { status, data } = await api.get('/api/dogs/all/logged');
    expect(401).toBe(status);
    expect('unauthorized').toEqual(data?.result);
  });
});
