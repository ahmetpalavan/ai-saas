import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/logo.png" className="p-1" alt="Bot Avatar" />
    </Avatar>
  );
};

export default BotAvatar;
