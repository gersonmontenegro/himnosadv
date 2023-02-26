export interface IDatabase {
  openargs: {
    name: 'hymns';
    location: 'default';
    dblocation: 'nosync';
  };
  dbname: 'hymns';
  transaction: (txn: unknown) => void;
}

export interface iHymnLyrics {
  id_hymn: number;
  position: number;
  timestamp: number;
  verse_number: number;
  verse: string;
}

interface IVerse {
  content: string;
  number: number;
}

export interface IHistory {
  position: number;
  timestamp: number;
  verse: IVerse;
}

export interface IHymn {
  id: number;
  number: number;
  title: string;
  hymn: {
    mp3Url: string;
    mp3UrlInstr: string;
    mp3Filename: string;
  };
  history: IHistory[];
}

export interface ITransaction {
  db: {
    openargs: {
      name: string;
      location: string;
      dblocation: string;
    };
    dbname: string;
  };
  txlock: boolean;
  readOnly: boolean;
  executes: [
    {
      success: null;
      sql: string;
      params: [];
    },
  ];
  executeSql: (
    p1: string,
    p2: [],
    p3: (tx: unknown, res: unknown) => void,
    p4: (p: string) => void,
  ) => null;
}

export interface IQueryResulType {
  insertId: number | undefined;
  rows?: {
    length: number;
    item: (value: number) => void;
    raw: VoidFunction;
  };
  rowsAffected: number | undefined;
}
