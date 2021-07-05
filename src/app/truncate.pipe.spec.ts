import { TrPipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TrPipe();
    expect(pipe).toBeTruthy();
  });
});
