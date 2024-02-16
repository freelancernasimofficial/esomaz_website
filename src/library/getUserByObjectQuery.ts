const getUserByObjectQuery = (userId: string) => {
  return `SELECT JSON_OBJECT('id',U.id,'uuId',U.uuId,'username',U.username,'firstName',U.firstName,'lastName',U.lastName,'avatar',(SELECT JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename) FROM Photos PH WHERE PH.id=U.avatarId)) FROM Users U WHERE U.id=${userId}`;
};

export default getUserByObjectQuery;
