export function descriptor(value = {}) {
  return function (target: any, propertyKey: string) {
    let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    console.log(descriptor);
    for (let d in value) {
      descriptor[d] = value[d];
    }
    Object.defineProperty(target, propertyKey, descriptor);
    console.log(descriptor);
  };
}
