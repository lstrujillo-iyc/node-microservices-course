const db = {
  user: [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
  ],
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  return (await list(table))?.find(item => item.id === id) || null;
}

async function upsert(table, data) {
  (await list(table)).push(data);
}

async function remove(table, id) {
  const index = (await list(table)).findIndex(item => item.id === id);
  if (index !== -1) {
    (await list(table)).splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
