import { useMemo, useContext } from 'react';
import DatabaseContext from '../infrastructure/database/DatabaseContext';

export interface IUseRealmQueryParams<T> {
  source: string | Realm.Results<T>;
  isFocused: boolean;
}

export default function useRealmQuery<T>({
  source,
  isFocused,
}: IUseRealmQueryParams<T>): Realm.Collection<T> | undefined {
  const { realm } = useContext(DatabaseContext);
  const query = useMemo(() => {
    return realm && isFocused && typeof source === 'string'
      ? realm.objects<T>(source)
      : undefined;
  }, [realm, source, isFocused]);

  return query;
}
