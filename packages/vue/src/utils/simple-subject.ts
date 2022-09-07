type Callback = () => void;

export class SimpleSubject {
  private _callbacks = new Set<Callback>();

  subscribe(cb: Callback) {
    this._callbacks.add(cb);
    return {
      unsubscribe: () => this._callbacks.delete(cb),
    };
  }

  next = () => this._callbacks.forEach((cb) => cb());
}
