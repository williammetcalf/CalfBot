import TwitchClientBuilder from './TwitchClientBuilder';

describe('TwitchClientBuilder', () => {
  it('should be able to be contructed', () => {
    expect(() => new TwitchClientBuilder()).not.toThrow;
  });

  it('clone should return a new instance', () => {
    const builder = new TwitchClientBuilder();
    const cloned = builder.clone();

    expect(cloned).not.toBe(builder);
  });

  it('withChannel should add a new channel without modifying the original builder', () => {
    const original = new TwitchClientBuilder();
    let next = original.withChannel('test');

    expect(next.channels).toEqual(['test']);
    expect(original.channels).toEqual([]);
  });

  it('on should add a new handler without modifying the original builder', () => {
    const original = new TwitchClientBuilder();
    const handler = () => {};
    let next = original.on('action', handler);

    expect(next.handlers).toEqual([{ event: 'action', handler: handler }]);
    expect(original.handlers).toEqual([]);
  });

  it('withOption should add a option(s) without modifying the original builder', () => {
    const original = new TwitchClientBuilder();
    const next = original
      .withOption({ test: 'some value' })
      .withOption({ otherKey: 'some other value' });

    expect(next.options).toEqual({
      test: 'some value',
      otherKey: 'some other value',
    });
    expect(original.options).toEqual({});
  });

  it('build should return a TwitchClient with the set values', () => {
    const handler = () => {};
    const builder = new TwitchClientBuilder()
      .withChannel('test')
      .withOption({ test: 'value' })
      .on('action', handler);

    expect(() => builder.build()).not.toThrow();
  });
});
