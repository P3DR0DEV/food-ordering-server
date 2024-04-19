import { compare, genSalt, hash } from 'bcryptjs'

export class HashPassword {
  readonly value: string

  constructor(value: string) {
    this.value = value
  }

  static async generateHash(value: string): Promise<HashPassword> {
    const password = await hash(value, await genSalt())

    return new HashPassword(password)
  }

  async compare(value: string): Promise<boolean> {
    return compare(value, this.value)
  }
}