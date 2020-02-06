class StackQuee {
  constructor () {
    this.events = [];
  }

  waitEvents() {
    return true;
  }

  pushEvent(event) {
    this.events.push(event)
  }

  processNextEvent() {
    if (this.events.length > 0) {
      let event = this.events[0];

      if (event.type === 'timeout') {
        if (Date.now() >= event.registeredTime + event.timeout) {
          this.events.shift();
          event.fn();
        }
      }
    }
  }
}

var sQuee = new StackQuee();
function setTimeout2(fn, timeout) {
  let event = {
    type: 'timeout',
    registeredTime: Date.now(),
    timeout,
    fn
  };

  sQuee.pushEvent(event);
};

setTimeout2(() => {
  console.log(`Timeout 1 ${Date.now()}`);

  setTimeout2(() => {
    console.log(`Timeout 4 ${Date.now()}`);
  }, 3000);

}, 2000);

setTimeout2(() => {
  console.log(`Timeout 2 ${Date.now()}`);

  setTimeout2(() => {
    console.log(`Timeout 5 ${Date.now()}`);
  }, 3000);

}, 2000);


setTimeout2(() => {
  console.log(`Timeout 3 ${Date.now()}`);

  setTimeout2(() => {
    console.log(`Timeout 6 ${Date.now()}`);
  }, 3000);

}, 2000);

while(sQuee.waitEvents()) {
  sQuee.processNextEvent();
};
