
import { io } from 'socket.io-client';

//const socket = io('http://localhost:8081');

const socket = io('http://localhost:10000');


export const subscribeToLike = (username, callback) => {
    socket.emit('setUniqueId',  username); // تمرير معرف المستخدم هنا
    socket.on('like', (data) => callback(data));
};


export const subscribeToChat = (callback) => {
    socket.on('chat', (data) => callback(data));
};

export const subscribeToGift = (callback) => {
    socket.on('gift', (data) => callback(data));
};

