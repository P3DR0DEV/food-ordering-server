export class UserRoleMapper {
  static toDomain(role: string) {
    switch (role) {
      case 'USER':
        return 'user'
      case 'ADMIN':
        return 'admin'
      default:
        return 'user'
    }
  }

  static toPersistence(role: string) {
    switch (role) {
      case 'admin':
        return 'ADMIN'
      case 'user':
        return 'USER'
      default:
        return 'USER'
    }
  }
}
