import { Avatar, AvatarImage } from "../ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar title="Onyx" className="h-8 w-8 inline-block align-middle z-[-1]">
      <AvatarImage src="/logo.svg" />
    </Avatar>
  );
};
