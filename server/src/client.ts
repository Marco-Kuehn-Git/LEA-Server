import WebSocket from "ws";

import { Server, MSG_TYPE } from "./server";
import { Vector2 } from "./interfaces";
import { Inventory } from "./inventory";
import { getWorldDataAsMsg } from "./data";

export class Client {
    public websocket: WebSocket;
    public id: string;
    public name: string;
    public clientList: Client[];
    public position: Vector2;
    public inventory: Inventory;

    private server: Server;

    constructor(
        websocket: WebSocket,
        server: Server,
        id: string,
        name: string,
        clientList: Client[],
        position: Vector2 = { x: 0, y: 0 },
        inventory: Inventory = new Inventory()
    ) {
        this.websocket = websocket;
        this.server = server;
        this.id = id;
        this.name = name;
        this.clientList = clientList;
        this.position = position;
        this.inventory = inventory;

        // Set event handler
        websocket.on("close", (code: number, reason: string) => {
            console.log("Client has disconnected!");
            this.clientList.splice(clientList.indexOf(this));
        });

        websocket.on("error", (err: Error) => {
            console.log(`ERR: ${err}`);
        });

        websocket.on("message", (data: WebSocket.Data) => {
            let msgType: number = data.toString().charCodeAt(0);
            let msgStr: string = data.toString().substring(1);

            switch (msgType) {
                case MSG_TYPE.CHAT:
                    console.log(`Msg(${MSG_TYPE[msgType]}) form ${this.name}`);
                    server.sendMsgToAllExcept(
                        this.websocket,
                        MSG_TYPE.CHAT,
                        msgStr
                    );
                    break;
                case MSG_TYPE.MOVE:
                    server.sendMsgToAllExcept(
                        this.websocket,
                        MSG_TYPE.MOVE,
                        this.id + " " + msgStr
                    );
                    break;
                case MSG_TYPE.AUTH:{
                    server.sendMsg(
                        this.websocket,
                        MSG_TYPE.SPAWN,
                        this.id
                    );

                    // Send init msg
                    server.sendMsg(
                        this.websocket,
                        MSG_TYPE.SET_WORLD,
                        getWorldDataAsMsg()
                    );
                }
            }
        });
    }
}
