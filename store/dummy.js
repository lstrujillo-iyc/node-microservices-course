const db = {
  user: [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
  ],
};

function list(table) {
  return db[table] || [];
}

function get(table, id) {
  return list(table)?.find(item => item.id === id) || null;
}

function upsert(table, data) {
  list(table).push(data);
}

function remove(table, id) {
  const index = list(table).findIndex(item => item.id === id);
  if (index !== -1) {
    list(table).splice(index, 1);
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
