const nanoid = require('nanoid');

const TABLE = 'user';

/**
 * @param {import('../../../types/store').Store} [injectedStore] - Store inyectado opcionalmente
 */
module.exports = function (injectedStore) {
  /** @type {import('../../../types/store').Store} */
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  function upsert(body) {
    const user = {
      name: body.name,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid.nanoid();
    }

    return store.upsert(TABLE, user);
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  return {
    list,
    get,
    upsert,
    remove,
  };
};
