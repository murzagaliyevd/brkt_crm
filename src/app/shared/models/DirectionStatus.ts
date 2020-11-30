enum DirectionStatus {
  Pending = 1,
  Accepted,
  PickedUp,
  WaitingStock,
  InStock
}

export function getDescription(status: DirectionStatus) {
  switch (status) {
    case DirectionStatus.Pending:
      return 'В ожидании';
    case DirectionStatus.Accepted:
      return 'Подтвержденные';
    case DirectionStatus.PickedUp:
      return 'Едет на склад';
    case DirectionStatus.WaitingStock:
      return 'Ожидают принятия на склад';
    case DirectionStatus.InStock:
      return 'На складе';
  }
}

export default DirectionStatus;
