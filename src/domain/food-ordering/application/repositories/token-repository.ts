import { Token } from '../../enterprise/entities/token'

export interface TokenRepository {
  get(userId: string): Promise<Token | null>
  save(token: Token): Promise<void>
}
