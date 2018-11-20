'use strict'

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
  },

  orgInsert: function (data) {
    return `INSERT INTO public.organization
    (organization_name)
    VALUES('${data.organization_name}')
    RETURNING organization_id`
  },

  orgList: function () {
    return `select * from public.organization ORDER BY organization_id ASC`
  },

  userOrgInsert: function (data) {
    return `INSERT INTO public.user_organization_mapping
    (user_id, organization_id, user_organization_role)
    VALUES(${data.user_id}, ${data.organization_id}, '${data.user_organization_role}')
    RETURNING user_organization_mapping_id`
  },

  userOrgList: function () {
    return `select * from public.user_organization_mapping ORDER BY user_organization_mapping_id ASC`
  },

  // userOrgReport: function () {
  //   return `select u.first_name, u.last_name, u.username, o.organization_name, uom.user_organization_role from user_organization_mapping uom
  //   join "user" as u on u.user_id = uom.user_id
  //   join organization as o on o.organization_id = uom.organization_id`
  // },

  userOrgReport: function (data) {
    return `select u.first_name, u.last_name, u.username, o.organization_name, uom.user_organization_role from user_organization_mapping uom
    join "user" as u on u.user_id = uom.user_id
    join organization as o on o.organization_id = uom.organization_id
   where (u.first_name = ${data.first_name} or ${data.first_name} is null)
     and (u.last_name = ${data.last_name} or ${data.last_name} is null)
     and (u.username = ${data.username} or ${data.username} is null)
     and (o.organization_name = ${data.organization_name} or ${data.organization_name} is null)
     and (uom.user_organization_role = ${data.user_organization_role} or ${data.user_organization_role} is null)
     order by ${data.column_name}  ${data.order} 
     offset ${data.page_index}
     limit ${data.page_size}`
  }

}
