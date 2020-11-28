import { createContext } from 'react';
import Realm from 'realm';

export interface IRealmContext {
  realm?: Realm;
  setRealm: (realm: Realm | undefined) => void;
}

export default createContext<IRealmContext>({
  realm: undefined,
  setRealm: () => {},
});
