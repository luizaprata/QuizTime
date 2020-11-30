import DatabaseContext from '@/infrastructure/database/DatabaseContext';
import { useMemo, useContext } from 'react';

export interface IUseRealmQueryParams<T> {
  source: string | Realm.Results<T>;
  filter?: string;
  isFocused: boolean;
}

export default function useRealmQuery<T>({
  source,
  filter,
  isFocused,
}: IUseRealmQueryParams<T>): Realm.Collection<T> | undefined {
  const { realm } = useContext(DatabaseContext);

  const query = useMemo(() => {
    if (!realm || !isFocused) {
      return undefined;
    }
    let queryObj =
      typeof source === 'string' ? realm.objects<T>(source) : source;
    if (filter) {
      queryObj = queryObj.filtered(filter);
    }
    return queryObj;
  }, [realm, isFocused, source, filter]);

  return query;
}
