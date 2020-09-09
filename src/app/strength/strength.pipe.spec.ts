import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
  it('should return weak - strength < 10', () => {
    const pipe = new StrengthPipe();
    const lowerBound = 0;
    const upperBound = 9;

    const lowerBoundOutput = pipe.transform(lowerBound);
    const upperBoundOutput = pipe.transform(upperBound);

    expect(lowerBoundOutput).toEqual(`${lowerBound} (weak)`);
    expect(upperBoundOutput).toEqual(`${upperBound} (weak)`);
  });

  it('should return strong - strength >= 10 && < 20', () => {
    const pipe = new StrengthPipe();
    const lowerBound = 10;
    const upperBound = 19;

    const lowerBoundOutput = pipe.transform(lowerBound);
    const upperBoundOutput = pipe.transform(upperBound);

    expect(lowerBoundOutput).toEqual(`${lowerBound} (strong)`);
    expect(upperBoundOutput).toEqual(`${upperBound} (strong)`);
  });

  it('should return unbelievable - strength >= 20', () => {
    const pipe = new StrengthPipe();
    const lowerBound = 20;

    const lowerBoundOutput = pipe.transform(lowerBound);

    expect(lowerBoundOutput).toEqual(`${lowerBound} (unbelievable)`);
  });
});
