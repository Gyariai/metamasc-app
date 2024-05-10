import "./wallets/index.js"
import "./drop.js"
import "./select/select.js"
import "./inputs.js"
import "./swith_net/switch.js"
import "./balance/setBalance.js"

global.Buffer = global.Buffer || require('buffer').Buffer;
new ClipboardJS('.btn_copy');
