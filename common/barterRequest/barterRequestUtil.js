import {
  BARTER_REQUEST_APPROVED,
  BARTER_REQUEST_PENDING,
  getBarterRequestStatusLabelByKey,
} from "../../enum/barterRequestStatus";
import {
  BARTER_ROLE_OFFERER,
  BARTER_ROLE_RECEIVER,
} from "../../enum/barterRole";
import { hoursDifference } from "../../util/dateUtil";

export function getBarterRequestExpiryCountDown(barterRequest) {
  const { expiryDate } = barterRequest;
  let hours = hoursDifference(expiryDate);
  let day = Math.floor(hours / 24);
  hours %= 24;
  let text = "";
  if (day > 0) {
    text += `${day}天`;
  }
  text += `${hours}小時後自動取消`;
  return text;
}

export function getBarterRequestInfo(barterRequest) {
  const { barterRole, offerItems, requestItem } = barterRequest;
  const offererInfo = `用${offerItems?.length ?? 0}件物品換取1件物品`;
  const receiverInfo = `想用${offerItems?.length ?? 0}物品換取您1件物品`;
  return barterRole === BARTER_ROLE_OFFERER.key ? offererInfo : receiverInfo;
}

export function getBarterRequestPriceDifference(barterRequest) {
  const { requestItem, offerItems } = barterRequest;
  let totalItemsValue = 0;
  // since Vue data is an object, we need to use this ancient methods
  for (let index = 0; index < offerItems.length; index++) {
    totalItemsValue += offerItems[index].price;
  }
  return totalItemsValue - requestItem.price;
}

export function getBarterRequestStatusLabel(barterRequest) {
  const { barterRequestStatus, barterRole } = barterRequest;
  return getBarterRequestStatusLabelByKey(barterRequestStatus, barterRole);
}

export function getBarterRequestStyleByStatus(barterRequest) {
  const { barterRequestStatus } = barterRequest;
  let style = "h4 bold ";
  if (barterRequestStatus === BARTER_REQUEST_APPROVED.key) {
    style += "green";
  } else if (barterRequestStatus === BARTER_REQUEST_PENDING.key) {
    style += "orange";
  } else {
    style += "secondary";
  }
  return style;
}

export function getCoverImage(barterRequest) {
  return barterRequest.requestItem.images[0];
}

export function getOppositePartyUser(barterRequest) {
  const { barterRole, createBy, receiver } = barterRequest;
  return barterRole === BARTER_ROLE_OFFERER.key ? receiver : createBy;
}

export function getBarterRequestType(barterRequest, store) {
  return barterRequest.createBy.sid === store.state.userProfile.profile.sid
    ? BARTER_ROLE_RECEIVER
    : BARTER_ROLE_RECEIVER;
}
