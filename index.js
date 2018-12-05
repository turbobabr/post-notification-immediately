const path = require('path');
const exec = require('child_process').exec;

const isElectron = 'electron' in process.versions;
const isUsingAsar = isElectron && process.mainModule && process.mainModule.filename.includes('app.asar');
function fixPathForAsarUnpack(path) {
  return isUsingAsar ? path.replace('app.asar', 'app.asar.unpacked') : path;
}

const postNotification = (name,userInfo) => {
  const electronFixedModuleBinaryPath = __dirname.endsWith('app.asar') ? 'node_modules/post-notification-immediately/bin' : 'bin'
  const BIN = options && options.execPath ? options.execPath : path.join(fixPathForAsarUnpack(__dirname), isElectron ? electronFixedModuleBinaryPath : 'bin');

  const binAndArgs = [BIN,JSON.stringify({
    name: name,
    userInfo: userInfo
  })];

  return new Promise((resolve,reject) => {
    exec(binAndArgs.join(" "),(err) => {
      if(err) {
          reject(err);
          return;
      }

      resolve(json);      
    });
  });
};

module.exports = postNotification;