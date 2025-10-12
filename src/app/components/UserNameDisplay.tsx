"use client";

import { useUserName } from "../hooks/Board/useUserName";

const UserNameDisplay = ({ userId }: { userId: string }) => {
  const { data: userName } = useUserName(userId);

  return (
    <span className="flex items-center justify-center py-2 px-2">
      {userName}
    </span>
  );
};

export default UserNameDisplay;
