/**
 * Util Type - Functional Error Handling
 * Instead of throwing exceptions, we return a Util that can be either:
 * - Ok(value): Success case with a value
 * - Err(error): Failure case with an error
 * Benefits:
 * - Forces explicit error handling (no silent failures)
 * - Makes error cases part of the type signature
 * - Better for async operations (no try-catch hell)
 * - Composable and chainable
 * This pattern is inspired by Rust's Util<T, E> and functional programming.
 */

export type Util<T, E = Error> = Ok<T> | Err<E>;

/**
 * Success case
 */
export class Ok<T> {
  public readonly isOk = true;
  public readonly isErr = false;

  constructor(public readonly value: T) {}

  /**
   * Maps the Ok value to another type
   */
  map<U>(fn: (value: T) => U): Util<U, never> {
    return new Ok(fn(this.value));
  }

  /**
   * Maps the Ok value to another Util (flatMap/bind)
   */
  mapAsync<U, E>(fn: (value: T) => Promise<Util<U, E>>): Promise<Util<U, E>> {
    return fn(this.value);
  }
}

/**
 * Failure case
 */
export class Err<E> {
  public readonly isOk = false;
  public readonly isErr = true;

  constructor(public readonly error: E) {}

  /**
   * Maps do nothing on Err (preserves the error)
   */
  map<U>(_fn: (value: never) => U): Util<U, E> {
    return new Err(this.error);
  }

  /**
   * Async maps do nothing on Err (preserves the error)
   */
  mapAsync<U>(_fn: (value: never) => Promise<Util<U, E>>): Promise<Util<U, E>> {
    return Promise.resolve(new Err(this.error));
  }
}

/**
 * Constructor functions for cleaner syntax
 */
export const ok = <T>(value: T): Util<T, never> => new Ok(value);
export const err = <E>(error: E): Util<never, E> => new Err(error);

/**
 * Type guards
 */
export function isOk<T, E>(Util: Util<T, E>): Util is Ok<T> {
  return Util.isOk;
}

export function isErr<T, E>(Util: Util<T, E>): Util is Err<E> {
  return Util.isErr;
}
