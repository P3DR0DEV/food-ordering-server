import { User } from '@/domain/food-ordering/enterprise/entities/user'

export class UserPresenter {
  static toHttpResponse(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
}
