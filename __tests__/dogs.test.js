import { create } from 'apisauce';

const api = create({
  baseURL: host
});

describe('Dogs', () => {
  it('all dogs - /dogs/all', async (done) => {
    const { status, data } = await api.get('/dogs/all');
    expect(200).toBe(status);
    expect([]).toEqual(data);
    done();
  });

  it('all dogs - logged - /dogs/all/logged', async (done) => {
    const { status, data } = await api.get('/dogs/all/logged');
    expect(401).toBe(status);
    expect('unauthorized').toEqual(data);
    done();
  });
});
