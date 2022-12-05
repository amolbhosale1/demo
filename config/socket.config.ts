// import { IncomingMessage, Server, ServerResponse } from "http";
// // interface Iuser{
// //     userId:string
// //     socketId:string
// //     content:string
// // }

// function socketConnection(
//   server: Server<typeof IncomingMessage, typeof ServerResponse>
// ) {
//   try {
//     const io = require("socket.io")(server, {
//       // pingTimeout: 60000,
//       cors: {
//         origin: "http://localhost:3000",
//       },
//     });

//     let users: any = [];

//     io.on("connection", (socket: any) => {
//       console.log("🚀 Someone connected!");
//       // console.log(users);

//       // get userId and socketId from client
//       socket.on("addUser", (userId: string) => {
//         const socketId = socket.id;
//         !users.some((user: any) => user.userId === userId) &&
//           users.push({ userId, socketId });
//         io.emit("getUsers", users);
//       });

//       // get and send message
//       socket.on("sendMessage", ({ senderId, receiverId, content }: any) => {
//         const user = users.find((user: any) => user.userId === receiverId);

//         io.to(user?.socketId).emit("getMessage", {
//           senderId,
//           content,
//         });
//       });

//       // typing states
//       socket.on("typing", ({ senderId, receiverId }: any) => {
//         const user = users.find((user: any) => user.userId === receiverId);
//         console.log(user);
//         io.to(user?.socketId).emit("typing", senderId);
//       });

//       socket.on("typing stop", ({ senderId, receiverId }: any) => {
//         const user = users.find((user: any) => user.userId === receiverId);
//         io.to(user?.socketId).emit("typing stop", senderId);
//       });

//       // user disconnected
//       socket.on("disconnect", () => {
//         console.log("⚠️ Someone disconnected");
//         users = users.filter((user: any) => user.socketId !== socket.id);
//         io.emit("getUsers", users);
//         // console.log(users);
//       });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// export default socketConnection;
