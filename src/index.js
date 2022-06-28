const connectToDB = require("./libs/mongoose");
const { app } = require("./app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { PORT } = require("./utils/constants");
const moment = require("moment");

connectToDB();

// const users = {};

// let numUsers = 0;

// io.on("connection", (socket) => {
//   let addedUser = false;

//   // when the client emits 'new message', this listens and executes
//   socket.on("new message", (data) => {
//     console.log("data", data);
//     // we tell the client to execute 'new message'
//     socket.broadcast.emit("new message", {
//       username: socket.username,
//       message: data,
//     });
//   });

//   // when the client emits 'add user', this listens and executes
//   socket.on("add user", (username) => {
//     console.log("add user username", username);
//     if (addedUser) return;

//     // we store the username in the socket session for this client
//     socket.username = username;
//     ++numUsers;
//     addedUser = true;
//     socket.emit("login", {
//       numUsers: numUsers,
//     });
//     // echo globally (all clients) that a person has connected
//     socket.broadcast.emit("user joined", {
//       username: socket.username,
//       numUsers: numUsers,
//     });
//   });

//   // when the client emits 'typing', we broadcast it to others
//   socket.on("typing", () => {
//     console.log("typing");
//     socket.broadcast.emit("typing", {
//       username: socket.username,
//     });
//   });

//   // when the client emits 'stop typing', we broadcast it to others
//   socket.on("stop typing", () => {
//     console.log("stop typing");
//     socket.broadcast.emit("stop typing", {
//       username: socket.username,
//     });
//   });

//   // when the user disconnects.. perform this
//   socket.on("disconnect", () => {
//     if (addedUser) {
//       --numUsers;

//       // echo globally that this client has left
//       socket.broadcast.emit("user left", {
//         username: socket.username,
//         numUsers: numUsers,
//       });
//     }
//   });
// });

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = async (userId) => {
  var commasep = userId.replace(/[\[\]']+/g, '')
  const myArray = commasep.split(",");

  const a = []
  users.forEach((user, index) => {

    myArray.forEach((receiverItem) => {
      const trimmedReceiverItem = receiverItem.trim()
      if (user.userId === trimmedReceiverItem) {
        a.push(user)
      }
    })


  })
  return a
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  socket.removeAllListeners();
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("typing", (flag) => {
    socket.broadcast.emit("typing", {
      userId: socket.userId,
      data: (() => {
        if (flag === true) {
          return "typing.....";
        } else {
          return "";
        }
      })(),
    });
  });

  const currTime = moment();
  //send and get message
  socket.on("sendMessage", async (senderId, receiverId, text, name) => {
    const recive = []
    recive.push(receiverId)
    const user = await getUser(receiverId);
    user.forEach((userItem) => {
      io.to(userItem?.socketId).emit("getMessage", {
        senderId,
        text,
        currTime,
        name
      });
    })

  });

  //when disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

http.on("connection", function (socket) {
  socket.removeAllListeners();

  socket.setTimeout(30 * 1000); // 30 second timeout. Change this as you see fit.
});

http.listen(PORT, () => {
  console.log(`Server is up and running on port no. ${PORT} 🚀`);
});
