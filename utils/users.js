import {
  User,
  Room,
  Message
} from "../model";
import connect from "../utils/mongoCon"

// Join user to chat
 async function userJoin(id, username, room) {
  const user = new User( { userName: username, socket: id });
  user.save()
  const _r = await Room.findOneAndUpdate({roomName: room},{$push: {activeUsers: user, activeSockets:id}},{
    new: true,
    useFindAndModify: false,
  }).exec()
  //console.log(_r)
  return {id, username, room}
  // users.push(user);

  // return user;
}

// Get current user
async function getCurrentUser(id) {
  //console.log(id)
  const _r = await User.findOne({socket:id}).exec()
  //console.log(_r)
  return _r
}
async function getCurrentRoom(id) {
  const _r = await Room.findOne({activeSockets: id}).exec()
  //console.log(_r)
  return _r
}

// User leaves chat
async function userLeave(id) {
  const _r = await Room.findOneAndUpdate({activeSockets: id},{$pull: {"activeUser.socket": id, activeSockets: id},},{
    new: true,
    useFindAndModify: false,
  }).exec()
  return _r
}

// Get room users
async function getRoomUsers(room) {
  // console.log("Get room users")
  // console.log(room)
  //console.log("Get room users")
  const _r = await  Room.findOne({activeSockets: room})
  _r.populate("activeUsers").execPopulate()
  //console.log(await _r.populate("activeUsers").execPopulate())
  //console.log("Get room users")
  return await _r.populate("activeUsers").execPopulate()
}
async function getChatLog(room) {
  const _r = await Room.findOne({activeSockets: room}).exec()
  return _r
}

module.exports = {
  userJoin,
  getCurrentUser,
  getCurrentRoom,
  userLeave,
  getRoomUsers,
  getChatLog
};
