import React from 'react';
import socketio from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8080';

export const socket = socketio(SOCKET_URL, { transports: ['websocket', 'polling', 'flashsocket'] });
export const SocketContext = React.createContext();