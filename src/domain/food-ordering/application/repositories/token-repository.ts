import { Token } from '../../enterprise/entities/token'

export interface TokenRepository {
  get(userId: string): Promise<Token[]>
  save(token: Token): Promise<void>
}
