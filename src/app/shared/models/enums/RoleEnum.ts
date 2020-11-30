export enum RoleEnum {
  ADMIN = 'ADMIN',
}

export namespace RoleEnum {
  export function toString(roleEnum: RoleEnum): string {
    if (roleEnum == null) {
      return null;
    }
    return RoleEnum[roleEnum];
  }

  export function parse(roleEnum: string): RoleEnum {
    return RoleEnum[roleEnum];
  }
}
