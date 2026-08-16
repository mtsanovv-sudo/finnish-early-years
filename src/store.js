/**
 * On-device storage. IndexedDB, no server, no sync, no analytics.
 *
 * This holds a record of a named four-year-old. It does not leave the iPad.
 * (DECISIONS.md D5.)
 *
 * Consequence of keeping it local: Safari can evict it. So export/import is a
 * launch requirement, not a later feature — see exportAll/importAll below.
 * Both object stores are created in version 1, including `observations` which
 * nothing writes yet, so that adding the observation loop never needs a
 * version bump and a migration on a device holding the only copy of the data.
 */

const DB_NAME = 'finnish-early-years';
const DB_VERSION = 1;
const KV = 'kv';
const OBS = 'observations';

let dbPromise = null;

function open () {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(KV)) {
        db.createObjectStore(KV);
      }
      if (!db.objectStoreNames.contains(OBS)) {
        const s = db.createObjectStore(OBS, { keyPath: 'id', autoIncrement: true });
        s.createIndex('at', 'at');            // chronological
        s.createIndex('strand', 'strandId');  // per-strand placement
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return dbPromise;
}

function tx (store, mode, fn) {
  return open().then(db => new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const req = fn(t.objectStore(store));
    t.oncomplete = () => resolve(req ? req.result : undefined);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  }));
}

/* ---- key/value: settings and the child profile ---- */

export function get (key)        { return tx(KV, 'readonly',  s => s.get(key)); }
export function set (key, value) { return tx(KV, 'readwrite', s => s.put(value, key)); }
export function del (key)        { return tx(KV, 'readwrite', s => s.delete(key)); }

export function getAllKv () {
  return open().then(db => new Promise((resolve, reject) => {
    const t = db.transaction(KV, 'readonly');
    const s = t.objectStore(KV);
    const out = {};
    const req = s.openCursor();
    req.onsuccess = () => {
      const c = req.result;
      if (c) { out[c.key] = c.value; c.continue(); } else { resolve(out); }
    };
    req.onerror = () => reject(req.error);
  }));
}

/* ---- observations (written by the loop in step 3) ---- */

export function addObservation (obs) {
  return tx(OBS, 'readwrite', s => s.add({ ...obs, at: obs.at || new Date().toISOString() }));
}

export function getObservations () {
  return tx(OBS, 'readonly', s => s.getAll());
}

/* ---- backup ---- */

const BACKUP_FORMAT = 'finnish-early-years/backup';

export function exportAll () {
  return Promise.all([getAllKv(), getObservations()]).then(([kv, observations]) => ({
    format: BACKUP_FORMAT,
    version: DB_VERSION,
    savedAt: new Date().toISOString(),
    kv,
    observations
  }));
}

/**
 * Hands the parent a file. Deliberately a download, not a share sheet — the
 * point is a copy they hold, somewhere Safari cannot reach.
 */
export function downloadBackup (data, childName) {
  const safe = String(childName || 'child').replace(/[^\p{L}\p{N}_-]+/gu, '-').slice(0, 40);
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `early-years-${safe}-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Safari needs the URL to outlive the click.
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

/**
 * Restore. Rejects anything that is not one of our backups rather than
 * half-importing a stranger's JSON over a real record.
 */
export function importAll (parsed) {
  if (!parsed || parsed.format !== BACKUP_FORMAT) {
    return Promise.reject(new Error('not a backup from this app'));
  }
  if (!parsed.kv || typeof parsed.kv !== 'object') {
    return Promise.reject(new Error('backup has no settings block'));
  }

  return open().then(db => new Promise((resolve, reject) => {
    const t = db.transaction([KV, OBS], 'readwrite');
    const kvs = t.objectStore(KV);
    const obs = t.objectStore(OBS);

    kvs.clear();
    obs.clear();

    for (const [k, v] of Object.entries(parsed.kv)) kvs.put(v, k);
    for (const o of (parsed.observations || [])) obs.put(o);

    t.oncomplete = () => resolve({
      settings: Object.keys(parsed.kv).length,
      observations: (parsed.observations || []).length
    });
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  }));
}

export function eraseAll () {
  return open().then(db => new Promise((resolve, reject) => {
    const t = db.transaction([KV, OBS], 'readwrite');
    t.objectStore(KV).clear();
    t.objectStore(OBS).clear();
    t.oncomplete = resolve;
    t.onerror = () => reject(t.error);
  }));
}

/** Free space, so the parent can see the backup warning is not theatre. */
export function storageEstimate () {
  if (!navigator.storage || !navigator.storage.estimate) return Promise.resolve(null);
  return navigator.storage.estimate().catch(() => null);
}
