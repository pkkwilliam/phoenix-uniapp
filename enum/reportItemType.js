export const REPORT_ITEM_TYPE_CULTURAL = { key: "CULTURAL", label: "文化" };
export const REPORT_ITEM_TYPE_MENTAL = { key: "MENTAL", label: "精神" };
export const REPORT_ITEM_TYPE_PHYSICAL = { key: "PHYSICAL", label: "身體" };
export const REPORT_ITEM_TYPE_RELIGIOUS = { key: "RELIGIOUS", label: "宗教" };
export const REPORT_ITEM_TYPE_SEXUAL = { key: "SEXUAL", label: "性別" };
export const REPORT_ITEM_TYPE_VERBAL = { key: "VERBAL", label: "言語" };

export const REPORT_ITEM_TYPES = [
  REPORT_ITEM_TYPE_CULTURAL,
  REPORT_ITEM_TYPE_MENTAL,
  REPORT_ITEM_TYPE_PHYSICAL,
  REPORT_ITEM_TYPE_RELIGIOUS,
  REPORT_ITEM_TYPE_SEXUAL,
  REPORT_ITEM_TYPE_VERBAL,
];

export function getReportItemTypeLabelByKey(key) {
  return getReportItemTypeLabelByKey(key).label;
}

export function getReportItemTypeByKey(key) {
  for (let index = 0; index < REPORT_ITEM_TYPES.length; index++) {
    if (REPORT_ITEM_TYPES[index].key === key) {
      return REPORT_ITEM_TYPES[index];
    }
  }
}
