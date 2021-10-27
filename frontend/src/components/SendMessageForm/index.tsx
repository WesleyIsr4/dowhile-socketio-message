import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SnedMessageForm() {
  const { user, signOut } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setIsSendingMessage(true);

    try {
      await api.post("messages", {
        message,
      });

      setMessage("");
    } finally {
      setIsSendingMessage(false);
    }
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          name="message"
          id="message"
          placeholder="Qual a sua expectativa para o evento"
        />
        <button disabled={isSendingMessage} type="submit">
          Enviar mensagem
        </button>
      </form>
    </div>
  );
}
