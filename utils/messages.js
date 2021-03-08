const moment = require('moment');
import {
  User,
  Room,
  Message
} from "../model";

async function formatMessage(id, text) {
  const _u = await  User.findOne({socket:id}).exec()
  console.log(_u)
const _m = new Message({
user: _u,
userName:_u.userName,
message:text
})
const _r = await Room.findOneAndUpdate({activeSockets: id},{$push: {messageLog: _m}},{
  new: true,
  useFindAndModify: false,
}).exec()
//console.log(_r)
  return {
    username: _u.userName,
    text,
    time: moment().format('h:mm a')
  };
}
function formatMessageBot(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = {formatMessage, formatMessageBot};
