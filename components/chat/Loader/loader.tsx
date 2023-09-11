import ChatBubble from "../ChatBubble/chat-bubble";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <>
      <ChatBubble variant={"bot"}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </ChatBubble>
    </>
  );
};

export default Loader;
