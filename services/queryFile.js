
module.exports = {

  userList: function () {
    return `select * from public."user" ORDER BY user_id ASC`
  },

  userInsert: function (data) {
    return `INSERT INTO public."user"
    (first_name, last_name, username)
    VALUES('${data.first_name}', '${data.last_name}', '${data.username}')
    RETURNING user_id`
  },

  userUpdate: function (data, userId) {
    return `UPDATE public."user"
    SET first_name='${data.first_name}', last_name='${data.first_name}', username='${data.username}'
    WHERE user_id='${userId}'`
  },

  userDelete: function (userId) {
    return `DELETE FROM public."user"
    WHERE user_id='${userId}'`
  }

}
