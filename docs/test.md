### __tests__/dogs.test.js

```javascript
import { create } from 'apisauce';

const api = create({
  baseURL: host
});

describe('Dogs', () => {
  test('all dogs - /dogs/all', async (done) => {
    const { status, data } = await api.get('/dogs/all');
    expect(200).toBe(status);
    expect([]).toEqual(data);
    done();
  });

  test('all dogs - logged - /dogs/all/logged', async (done) => {
    const { status, data } = await api.get('/dogs/all/logged');
    expect(401).toBe(status);
    expect('unauthorized').toEqual(data);
    done();
  });
});
```
