const STORAGE_KEY = 'guestbook-my-entries';

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

// 내가 작성한 방명록의 id -> edit_token 매핑을 로컬에 저장해
// 본인 글에만 수정/삭제 버튼을 노출하고, 수정/삭제 요청 시 토큰을 함께 보낸다.
export function getMyEntryToken(id) {
  return readStore()[id] ?? null;
}

export function getMyEntryIds() {
  return Object.keys(readStore());
}

export function saveMyEntry(id, token) {
  const store = readStore();
  store[id] = token;
  writeStore(store);
}

export function removeMyEntry(id) {
  const store = readStore();
  delete store[id];
  writeStore(store);
}
