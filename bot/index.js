import { WebSocket } from 'ws';

const DOMAIN = "https://pogn.chall.lac.tf";

const Msg = {
    GAME_UPDATE: 0,
    CLIENT_UPDATE: 1,
    GAME_END: 2
};

const wsurl = new URL(DOMAIN);
wsurl.protocol = DOMAIN.protocol == 'http:' ? 'ws' : 'wss';
wsurl.pathname = '/ws';

let isBack = false;

const ws = new WebSocket(wsurl);

ws.addEventListener('open', () => {
    console.log("open");
    ws.addEventListener('message', (e) => {
        const msg = JSON.parse(e.data);
        switch (msg[0]) {
        case Msg.GAME_UPDATE:
            console.log("Ball position", msg[1][0]);
            if (msg[1][0][0] <= 5) {
                isBack = true;
            }
            let position = [0, 0];
            if (isBack) {
                position = msg[1][0];
            }
            ws.send(JSON.stringify([
                Msg.CLIENT_UPDATE,
                [ position, [100000, 0] ]
            ]));
            break;
        case Msg.GAME_END:
            console.log(msg[1]);
            ws.close();
            break;
        }
    });
});
