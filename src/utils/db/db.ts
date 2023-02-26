import {Logger} from '@utils/logs';
import {openDatabase} from 'react-native-sqlite-storage';
import {IDatabase, IHistory, IHymn, iHymnLyrics, IQueryResulType, ITransaction} from '@utils/types';

const db: IDatabase = openDatabase({name: 'hymns', location: 'default'});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = new (Logger as any).getInstance();

const DB = {
  createTablesFromQueries: () => {
    let sqlQuery = '';
    const tableList = [];

    sqlQuery = 'CREATE TABLE IF NOT EXISTS hymns (';
    sqlQuery += 'id numeric not null,';
    sqlQuery += 'number numeric not null,';
    sqlQuery += 'title text not null,';
    sqlQuery += 'mp3Url text not null,';
    sqlQuery += 'mp3UrlInstrumental text not null,';
    sqlQuery += 'mp3Filename text not null';
    sqlQuery += ');';
    tableList.push(sqlQuery);

    sqlQuery = 'CREATE TABLE IF NOT EXISTS hymn_lyrics (';
    sqlQuery += 'id_hymn numeric not null,';
    sqlQuery += 'position numeric not null,';
    sqlQuery += 'timestamp numeric not null,';
    sqlQuery += 'verse_number numeric not null,';
    sqlQuery += 'verse text not null';
    sqlQuery += ');';
    tableList.push(sqlQuery);

    return tableList;
  },

  executeStatement: (sqlQuery: string) => {
    return new Promise((resolve, reject) => {
      if (sqlQuery) {
        db.transaction((txn: ITransaction) => {
          try {
            txn.executeSql(
              sqlQuery,
              [],
              (tx: unknown, res: unknown) => {
                resolve(res);
              },
              (err: string) => {
                reject(err);
              },
            );
          } catch (err: unknown) {
            reject(`Catch error executing SQL ${err}`);
          }
        });
      } else {
        reject(false);
      }
    });
  },

  initTables: () => {
    const tableList = DB.createTablesFromQueries();
    return new Promise((resolve, reject) => {
      tableList.forEach(async (item) => {
        try {
          const result = await DB.executeStatement(item);
          if (result) {
            resolve(true);
          } else {
            reject();
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  },

  getTable: ({tableName}: {tableName: string}) => {
    return new Promise((resolve, reject) => {
      if (tableName) {
        db.transaction((txn: ITransaction) => {
          try {
            txn.executeSql(
              `select * from ${tableName}`,
              [],
              (tx: unknown, res: unknown) => {
                resolve(res);
              },
              (err: string) => {
                log.error('SQL/error:', err);
                reject(`Error executing SQL:${err}`);
              },
            );
          } catch (err: unknown) {
            log.error('Error catched:', err);
            reject(`Catch Error executing SQL:${err}`);
          }
        });
      } else {
        reject('Not tableName defined');
      }
    });
  },

  createHymnQuery: (data: IHymn): string => {
    const {
      id,
      hymn: {mp3Url, mp3Filename, mp3UrlInstr},
      number,
      title,
    } = data;

    const productQuery = `
          insert into hymns (
              id,
              number,
              title,
              mp3Url,
              mp3UrlInstrumental,
              mp3Filename
          ) values (
              '${id}',
              '${number}',
              '${title}',
              '${mp3Url}',
              '${mp3UrlInstr}',
              '${mp3Filename}'
          )
      `;
    return productQuery;
  },

  createLyricsQuery: (history: IHistory[], id: number): string[] => {
    const queriesList = [''];
    history.forEach((item) => {
      const {position, timestamp, verse} = item;
      const lyricsQuery = `
            insert into hymn_lyrics (
                id_hymn,
                position,
                timestamp,
                verse_number,
                verse
            ) values (
                '${id}',
                '${position}',
                '${timestamp}',
                '${verse.number}',
                '${verse.content}'
            )
        `;
      queriesList.push(lyricsQuery);
    });
    return queriesList;
  },

  createLyricsGroupQuery: (data: IHymn): string => {
    const {id, history} = data;
    let lyricsQuery: string[] = [''];
    history.forEach((item) => {
      lyricsQuery = DB.createLyricsQuery();
    });
    return productQuery;
  },

  insertDataToTables: (hymnsData: UnknownObject) => {
    Object.keys(hymnsData).forEach(async (key: string) => {
      const hymnDataQuery = DB.createHymnQuery(hymnsData[key] as IHymn);
      log.debug('---------------------');
      // DB.executeStatement(hymnDataQuery);
      // console.log('Create:', (hymnsData[key] as IHymn).id, (hymnsData[key] as IHymn).history);
      DB.createLyricsQuery((hymnsData[key] as IHymn).history);
    });
  },

  truncateTable: async (tableName: string) => {
    try {
      await DB.executeStatement(`delete from ${tableName}`);
    } catch (error) {
      console.log('dropResult:error:', error);
    }
  },

  extractRows: (queryResult: IQueryResulType): GenericObject<unknown>[] => {
    const rowsExtracted: GenericObject<unknown>[] = [{}];
    if (Object.keys(queryResult).indexOf('rows') >= 0) {
      const {rows} = queryResult as IQueryResulType;
      if (rows) {
        for (let i = 0; i < rows.length; i += 1) {
          if (rows.item) {
            // log.debug('=============================');
            // console.log(rows.item(i));
            rowsExtracted.push(rows.item(i));
          }
        }
      }
    }
    return rowsExtracted;
  },

  extractTable: async ({tableName}: {tableName: string}): Promise<false | unknown[]> => {
    try {
      const data = await DB.getTable({tableName});
      const dataExtracted = DB.extractRows(data as IQueryResulType);
      return dataExtracted;
    } catch (error) {
      return false;
    }
  },

  verifyDB: async () => {
    const resultCreateTables = await DB.initTables();
    return resultCreateTables;
  },
};

export {DB};
