import { v4 as uuidv4 } from 'uuid';

// export default function getUid() {
//   // 先读取本地的uid参数
//   let uid = localStorage.getItem('userTempId');
//   // 如果没有，产生一个新的uid并存储起来
//   if (!uid) {
//     uid = uuidv4();
//     localStorage.setItem('userTempId', uid);
//   }
//   return uid
// }

// 先读取本地的uid参数
let uid = localStorage.getItem('userTempId')

export default function getUid() {
  // 如果没有，产生一个新的uid并存储起来
  if (!uid) {
    uid = uuidv4();
    localStorage.setItem('userTempId', uid);
  }
  return uid
}