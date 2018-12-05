# post-notification-immediately

A helper workaround module for Electron issue ([#15789](https://github.com/electron/electron/issues/15789)) to post notifications immediately via macOS distributed notification center. This module also can be used in any `node.js` application running on `macOS`.

## Installation

```
$ npm install post-notification-immediately
```

*Requires macOS 10.12 or later.*

## Usage

```js
const postNotification = require('post-notification-immediately');

const userInfo = {
    data: 'Hey there! :)'
};

postNotification('kUniqueNotificationName',userInfo).then(
    () => {
        // sent successfully
    },
    (err) => {
        // error caused by payload parsing
    }
);
```

## Maintainers

- [Andrey Shakhmin](https://github.com/turbobabr)

## License

MIT

