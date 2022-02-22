export const ITEM_STATUS_ACTIVE = { key: "ACTIVE", label: "" };
export const ITEM_STATUS_DELETED = { key: "DELETED", label: "已删除" };
export const ITEM_STATUS_PENDING = { key: "PENDING", label: "審核中" };
export const ITEM_STATUS_RESERVED = { key: "RESERVED", label: "保留中" };
export const ITEM_STATUS_SOLD = { key: "SOLD", label: "已售出" };

export const ITEM_STATUSES = [
  ITEM_STATUS_ACTIVE,
  ITEM_STATUS_DELETED,
  ITEM_STATUS_PENDING,
  ITEM_STATUS_RESERVED,
  ITEM_STATUS_SOLD,
];

export function getItemStatusByKey(key) {
  for (let index = 0; index < ITEM_STATUSES.length; index++) {
    if (key === ITEM_STATUSES[index].key) {
      return ITEM_STATUSES[index];
    }
  }
}

export function getItemStatusLabelByKey(key) {
  return getItemStatusByKey(key).label;
}
