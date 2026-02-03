import { DurationPipe } from './duration.pipe';

describe('DurationPipe isolate unit tests', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('should format minutes less than 60 correctly', () => {
    expect(pipe.transform(5)).toBe('5 минут');
    expect(pipe.transform(59)).toBe('59 минут');
  });

  it('should format hours and minutes correctly', () => {
    expect(pipe.transform(60)).toBe('1 час 0 минут');
    expect(pipe.transform(61)).toBe('1 час 1 минута');
    expect(pipe.transform(62)).toBe('1 час 2 минуты');
    expect(pipe.transform(120)).toBe('2 часа 0 минут');
  });

  it('should return empty string for zero input', () => {
    expect(pipe.transform(0)).toBe('');
  });

  it('should return empty string for undefined input (isolated test)', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });
});
