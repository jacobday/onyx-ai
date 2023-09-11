import { BotAvatar } from "../bot-avatar";
import { UserAvatar } from "../user-avatar";
import styles from "./chat-bubble.module.scss";

interface ChatBubbleProps {
  variant: "user" | "bot";
  children: React.ReactNode;
}

const ChatBubble = (props: ChatBubbleProps) => {
  return (
    <div className={styles.container} data-variant={props.variant}>
      {/* Sender Image */}
      <div className="hidden md:inline-block">
        {props.variant === "user" ? <UserAvatar /> : <BotAvatar />}
      </div>

      {/* Chat Bubble */}
      <div className={styles.bubble} data-variant={props.variant}>
        {props.children}
      </div>
    </div>
  );
};

export default ChatBubble;
