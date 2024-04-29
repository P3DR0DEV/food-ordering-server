type Status = 'NEW' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'

export class OrderStatusMapper {
  static toDomain(status: Status) {
    switch (status) {
      case 'NEW':
        return 'new'
      case 'PREPARING':
        return 'preparing'
      case 'DELIVERING':
        return 'delivering'
      case 'DELIVERED':
        return 'delivered'
      case 'CANCELLED':
        return 'cancelled'
    }
  }

  static toPersistence(status?: 'new' | 'preparing' | 'delivering' | 'delivered' | 'cancelled') {
    switch (status) {
      case 'new':
        return 'NEW'
      case 'preparing':
        return 'PREPARING'
      case 'delivering':
        return 'DELIVERING'
      case 'delivered':
        return 'DELIVERED'
      case 'cancelled':
        return 'CANCELLED'
      default:
        return 'NEW'
    }
  }
}
