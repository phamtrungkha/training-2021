import { TodoDataPipe } from './todo-data.pipe';

describe('TodoDataPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoDataPipe();
    expect(pipe).toBeTruthy();
  });
});
