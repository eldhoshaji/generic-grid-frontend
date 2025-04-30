import { RowStyleRule } from "../types/api/TableModel";

export function getRowClassFromRules<T extends Record<string, any>>(record: T, rules?: RowStyleRule[]): string {
  if (!rules) return '';
  return rules
    .filter((rule) => {
      const recordValue = record[rule.field];
      if (recordValue == null) return false;

      switch (rule.operator) {
        case 'equals':
          return recordValue === rule.value;
        case 'notEquals':
          return recordValue !== rule.value;
        case 'lt':
          return recordValue < rule.value;
        case 'gt':
          return recordValue > rule.value;
        case 'lte':
          return recordValue <= rule.value;
        case 'gte':
          return recordValue >= rule.value;
        case 'includes':
          return typeof recordValue === 'string' && recordValue.includes(rule.value);
        case 'startsWith':
          return typeof recordValue === 'string' && recordValue.startsWith(rule.value);
        case 'endsWith':
          return typeof recordValue === 'string' && recordValue.endsWith(rule.value);
        case 'matches':
          try {
            const regex = new RegExp(rule.value);
            return regex.test(recordValue);
          } catch {
            return false;
          }
        default:
          return false;
      }
    })
    .map((rule) => rule.class_name)
    .join(' ');
}
