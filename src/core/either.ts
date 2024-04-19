export class Failure<F, S> {
  reason: F

  constructor(reason: F) {
    this.reason = reason
  }

  hasFailed(): this is Failure<F, S> {
    return true
  }

  hasSucceeded(): this is Success<F, S> {
    return false
  }
}

export class Success<F, S> {
  result: S

  constructor(result: S) {
    this.result = result
  }

  hasSucceeded(): this is Success<F, S> {
    return true
  }

  hasFailed(): this is Failure<F, S> {
    return false
  }
}

export type Either<F, S> = Failure<F, S> | Success<F, S>

export const failure = <F, S>(value: F): Either<F, S> => new Failure(value)

export const success = <F, S>(value: S): Either<F, S> => new Success(value)
