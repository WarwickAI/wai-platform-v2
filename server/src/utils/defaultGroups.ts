import { Group } from "../entities/Group";
import { User } from "../entities/User";

export const getDefaultGroups = async () => {
  var adminGroup = await Group.findOneOrFail({
    where: { name: "Admin" },
  });

  var allGroup = await Group.findOneOrFail({
    where: { name: "All" },
  });

  if (!adminGroup) {
    adminGroup = Group.create({ name: "Admin", users: [] });
    await adminGroup.save();
  }

  if (!allGroup) {
    allGroup = Group.create({ name: "All", users: [] });
    await allGroup.save();
  }

  return { adminGroup, allGroup };
};

export const getUserGroup = async (user: User) => {
  const groupName = `${user.firstName} ${user.lastName} [${user.email}]`;
  const userGroup = await Group.findOne({
    where: { name: groupName },
  });

  if (userGroup) {
    return userGroup;
  }

  const newGroup = Group.create({
    name: groupName,
    users: [user],
  });
  await newGroup.save();

  return newGroup;
};
