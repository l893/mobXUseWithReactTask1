import { configure } from 'mobx';

let isMobxConfigured = false;

export class RootStore {}

export function configureMobx(): void {
  if (isMobxConfigured) {
    return;
  }

  configure({
    enforceActions: 'observed',
  });

  isMobxConfigured = true;
}

export function createRootStore(): RootStore {
  configureMobx();

  return new RootStore();
}
