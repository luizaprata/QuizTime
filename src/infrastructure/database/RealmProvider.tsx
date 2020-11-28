import React, { PropsWithChildren, useState } from 'react';
import RealmContext, { IRealmContext } from './RealmContext';

export interface IRealmProviderProps extends PropsWithChildren<{}> {
  initialRealm?: Realm;
}

export default ({ initialRealm, children }: IRealmProviderProps) => {
  const [realm, setRealm] = useState<Realm | undefined>(initialRealm);

  const providerValue: IRealmContext = { realm, setRealm };

  return (
    <RealmContext.Provider value={providerValue}>
      {children}
    </RealmContext.Provider>
  );
};
