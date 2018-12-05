const path = require('path');
const exec = require('child_process').exec;

const isElectron = 'electron' in process.versions;
const isUsingAsar = isElectron && process.mainModule && process.mainModule.filename.includes('app.asar');
function fixPathForAsarUnpack(path) {
  return isUsingAsar ? path.replace('app.asar', 'app.asar.unpacked') : path;
}

function isString(obj) {
  return obj && toString.call(obj) === '[object String]';
}

function isObject(obj) {
  return toString.call(obj) === '[object Object]';  
}

const postNotification = (name,userInfo,options) => {
  const electronFixedModuleBinaryPath = __dirname.endsWith('app.asar') ? 'node_modules/post-notification-immediately/bin' : 'bin'
  const BIN = options && options.execPath ? options.execPath : path.join(fixPathForAsarUnpack(__dirname), isElectron ? electronFixedModuleBinaryPath : 'bin');
  return new Promise((resolve,reject) => {    
    if(!isString(name)) {
      reject(new Error("'name' argument should be a valid string!"));
      return;
    }

    if(userInfo && !isObject(userInfo)) {
      reject(new Error("'userInfo' argument should be empty or a valid object!"));
      return;
    }

    let execStr;
    try {
      // FIXME: Dirty way to escape quotes in strigified objects!
      execStr = [BIN,JSON.stringify(JSON.stringify({
        name: name,
        payload: userInfo || {}
      }))].join(" ");
    } catch(e) {
      reject(e);
      return;
    }
    
    exec(execStr,(err) => {
      if(err) {
          reject(err);
          return;
      }

      resolve();      
    });
  });
};

module.exports = postNotification;