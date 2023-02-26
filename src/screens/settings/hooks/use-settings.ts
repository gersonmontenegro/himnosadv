import {useCallback, useEffect} from 'react';
// import {logger} from 'react-native-logs';
import {DB} from '@utils/db';
import {HymnsData} from '@assets/bd';
import {IQueryResulType} from '@utils/types';
import {Logger} from '@utils/logs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = new (Logger as any).getInstance();

export const useSettings = () => {
  const setDB = async () => {
    const verificationResult = await DB.verifyDB();
    if (verificationResult) {
      const hymnsQuantity = (await DB.getTable({
        tableName: 'hymns',
      })) as IQueryResulType;
      if (hymnsQuantity.rows?.length === 0) {
        DB.insertDataToTables(HymnsData);
      }
    }
  };
  useEffect(() => {
    setDB();
  }, []);

  const onPressImport = useCallback(async () => {
    log.info('Passing...');
    // const hymns = (await DB.getTable({
    //   tableName: 'hymns',
    // })) as IQueryResulType;
    // console.log(hymns.rows?.item(0));
    const hymns = await DB.extractTable({tableName: 'hymns'});
    console.log(hymns.length);
  }, []);

  const onPressRemove = useCallback(async () => {
    const hymns = await DB.truncateTable('hymns');
    console.log(hymns.length);
  }, []);

  return {
    onPressImport,
    onPressRemove,
  };
};
