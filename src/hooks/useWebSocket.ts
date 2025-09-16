import { useEffect, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";

type UseWebSocketProps = {
  url: string;
  topics: string[];
  onMessage: (topic: string, message: IMessage) => void;
};

export const useWebSocket = ({ url, topics, onMessage }: UseWebSocketProps) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: url,
      reconnectDelay: 5000,
      onConnect: () => {
        topics.forEach((topic) => {
          client.subscribe(topic, (msg) => onMessage(topic, msg));
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [url, topics, onMessage]);
};
