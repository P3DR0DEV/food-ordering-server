import { TokenRepository } from '@/domain/food-ordering/application/repositories/token-repository'
import { Token } from '@/domain/food-ordering/enterprise/entities/token'

export class TokenInMemoryRepository implements TokenRepository {
  public tokens: Token[] = []
  async get(userId: string): Promise<Token | null> {
    const token = this.tokens.find((t) => t.userId.toString() === userId)
    if (!token) {
      return null
    }
    return token
  }

  async save(token: Token): Promise<void> {
    this.tokens.push(token)
  }
}
