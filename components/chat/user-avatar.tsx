import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar
      title={user?.fullName || "You"}
      className="h-8 w-8 inline-block align-middle z-[-1]"
    >
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
