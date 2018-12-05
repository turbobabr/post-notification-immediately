# post-notification-immediately


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

