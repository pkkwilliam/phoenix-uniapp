import Stomp from "stompjs";

let socketOpen = false;
let socketMsgQueue = [];

export default {
  client: null,
  baseURL: "wss://phoenix-uat-api.bitcode.mo/web-socket/connect",
  init() {
    if (this.client) {
      return Promise.resolve(this.client);
    }
    return new Promise((resolve, reject) => {
      const ws = {
        send: this.sendMessage,
        onopen: null,
        onmessage: null,
        close: this.closeSocket,
      };

      uni.connectSocket({
        url: this.baseURL,
        header: this.header,
      });

      uni.onSocketOpen(function (res) {
        console.log("WebSocket连接已打开！", res);

        socketOpen = true;
        for (let i = 0; i < socketMsgQueue.length; i++) {
          ws.send(socketMsgQueue[i]);
        }
        socketMsgQueue = [];

        ws.onopen && ws.onopen();
      });

      uni.onSocketMessage(function (res) {
        ws.onmessage && ws.onmessage(res);
      });

      uni.onSocketError(function (res) {
        console.log("WebSocket 错误！", res);
      });

      uni.onSocketClose((res) => {
        this.client.disconnect();
        this.client = null;
        socketOpen = false;
        console.log("WebSocket 已关闭！", res);
      });

      Stomp.setInterval = function (interval, f) {
        return setInterval(f, interval);
      };
      Stomp.clearInterval = function (id) {
        return clearInterval(id);
      };

      const client = (this.client = Stomp.over(ws));
      client.connect(this.header, function () {
        console.log("stomp connected");
        resolve(client);
      });
    });
  },
  disconnect() {
    uni.closeSocket();
  },
  sendMessage(message) {
    if (socketOpen) {
      uni.sendSocketMessage({
        data: message,
      });
    } else {
      socketMsgQueue.push(message);
    }
  },
  closeSocket() {
    console.log("closeSocket");
  },
};
