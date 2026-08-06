function getDirName(id: string): string {
  return id.split('/').at(-1) ?? id;
}

export function compareIds(firstId: string, secondId: string): number {
  return getDirName(secondId).localeCompare(getDirName(firstId), undefined, {
    numeric: true,
  });
}
