class Publisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  publish(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

export default Publisher;
