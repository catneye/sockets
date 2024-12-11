/* 
 * Copyright (C) 2017 Oleg E. Kurchenko Rostov-on-Don
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function Websocket() {
    var websocket = null;
    var onmessagefuncs = [];
    var onloadfuncs = [];
    var onclosefuncs = [];
    var onerrorfuncs = [];
    var onopenfuncs = [];
    var sockuri;

    this.init = function (uri, onopen, onmessage, onerror, onclose, isdepricated) {
        console.log('Opening WebSocket: ' + uri);
        sockuri = uri;
        websocket = new WebSocket(uri);
        websocket.onerror = function (event) {
            onerror ? onerror(event) : onError(event);
        };
        websocket.onopen = function (event) {
            onopen ? onopen(event) : onOpen(event);
        };
        websocket.onmessage = function (event) {
            onmessage ? onmessage(event) : onMessage(event);
        };
        websocket.onclose = function (event) {
            onclose ? onclose(event) : onClose(event);
        };
    };

    this.close = function () {
        websocket.close();
    };

    this.send = function (message) {
        console.log('WebSocket doSend \n' + message);
        if (websocket.readyState === 1) {
            websocket.send(message);
        } else {
            console.log('WebSocket is ' + websocket.readyState);
        }
    };


    function onMessage(evt) {
        console.log('WebSocket onMessage');
        if (evt) {
            var json = JSON.parse(evt.data);
            console.log(json.response);
            for (var i = 0; i < onmessagefuncs.length; i++) {
                var callback = onmessagefuncs[i];
                if (callback.response === json.response) {
                    callback.funcptr(json.result, json.object);
                }
            }
        }

    }

    function onOpen(evt) {
        console.log('WebSocket onOpen');
        for (var i = 0; i < onopenfuncs.length; i++) {
            var callback = onopenfuncs[i];
            callback.funcptr();
        }
    }
    function onError(evt) {
        console.log('WebSocket onError');
        for (var i = 0; i < onerrorfuncs.length; i++) {
            var callback = onerrorfuncs[i];
            callback.funcptr();
        }
    }
    function onClose(evt) {
        console.log('WebSocket onClose');
        for (var i = 0; i < onclosefuncs.length; i++) {
            var callback = onclosefuncs[i];
            callback.funcptr();
        }
    }

    this.addOnError = function (funcptr) {
        var callback = {};
        callback.funcptr = funcptr;
        onerrorfuncs.push(callback);
    };
    
    this.addOnClose = function (funcptr) {
        var callback = {};
        callback.funcptr = funcptr;
        onclosefuncs.push(callback);
    };

    this.addOnMessage = function (response, funcptr) {
        var callback = {};
        callback.response = response;
        callback.funcptr = funcptr;
        onmessagefuncs.push(callback);
    };

    this.addOnOpen = function (funcptr) {
        var callback = {};
        callback.funcptr = funcptr;
        onopenfuncs.push(callback);
    };

    this.addOnLoad = function (funcptr) {
        var callback = {};
        callback.funcptr = funcptr;
        onloadfuncs.push(callback);
    };

    window.onload = function () {
        for (var i = 0; i < onloadfuncs.length; i++) {
            var callback = onloadfuncs[i];
            callback.funcptr();
        }
    };

}