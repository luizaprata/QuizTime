import React, { useMemo } from 'react';
import { RealmContext } from '../infrastructure/database/RealmContext';

export interface IUseRealmQueryParams<T> {
  source: string | Realm.Results<T>;
}

export default function useRealmQuery<T>({
  source,
}: IUseRealmQueryParams<T>): Realm.Collection<T> | undefined {
  const { realm } = React.useContext(RealmContext);
  const query = useMemo(() => {
    return realm && typeof source === 'string'
      ? realm.objects<T>(source)
      : undefined;
  }, [realm, source]);

  return query;
}
