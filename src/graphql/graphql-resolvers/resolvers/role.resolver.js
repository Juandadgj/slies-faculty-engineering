import Role from '../../../model/role/Role';

const roleResolver = {
  roles: async () => await Role.find(),
  rolesByID: async ({ id }) => await Role.findOne({ id }),
  createRole: async ({ role }) => {
    if (!role) {
      throw new Error('Fields required!');
    }
    try {
      const newRole = new Role(role);
      return await newRole.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateRole: async ({ role }) => {
    if (!role.id) {
      throw new Error('ID is required!');
    }
    const currentRole = await Role.findOne({ id: role.id });
    if (!currentRole) {
      throw new Error("That user doesn't exist!'");
    }
    try {
      return await Role.findOneAndUpdate({ id: role.id }, role, { new: true });
    } catch (error) {
      console.log(error);
    }
  },
};

export default roleResolver;
