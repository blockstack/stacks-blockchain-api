import watch from 'node-watch';
import { exec } from 'child_process';
import { loadDotEnv } from './helpers';
import { DataStore } from './datastore/common';
import { PgDataStore } from './datastore/postgres-store';
import { MemoryDataStore } from './datastore/memory-store';
import { startApiServer } from './api/init';
import { startEventSocketServer } from './event-stream/socket-server';
import { StacksCoreRpcClient } from './core-rpc/client';

loadDotEnv();

const compileSchemas = process.argv.includes('--compile-schemas');
const generateSchemas = () => exec('npm run generate:schemas');

if (compileSchemas) {
  watch('./docs', { recursive: true, filter: /\.schema\.json$/ }, () => generateSchemas());
}

async function init(): Promise<void> {
  let db: DataStore;
  switch (process.env['STACKS_SIDECAR_DB']) {
    case 'memory': {
      console.log('using in-memory db');
      db = new MemoryDataStore();
      break;
    }
    case 'pg':
    case undefined: {
      db = await PgDataStore.connect();
      break;
    }
    default: {
      throw new Error(`invalid STACKS_SIDECAR_DB option: "${process.env['STACKS_SIDECAR_DB']}"`);
    }
  }
  await startEventSocketServer(db);
  // await new StacksCoreRpcClient().waitForConnection();
  await startApiServer(db);
}

init()
  .then(() => {
    console.log('app started');
  })
  .catch(error => {
    console.error(`app failed to start: ${error}`);
    console.error(error);
    process.exit(1);
  });
