"use client";

import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import Loader from "@/components/chat/Loader/loader";
import { UserAvatar } from "@/components/chat/user-avatar";
import { BotAvatar } from "@/components/chat/bot-avatar";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { ChatInput } from "@/components/ChatInput/chat-input";

import { formSchema } from "./constants";
import ChatBubble from "@/components/chat/ChatBubble/chat-bubble";

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      {/* ConversationPage Heading */}
      <Heading
        title="Conversation"
        description="Get answers to your biggest questions."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="text-violet-500/10"
      />

      {/* ConversationPage Content Container */}
      <div>
        {/* Section: Conversation Input */}
        <section>
          <ChatInput
            placeholder="What do you think the world will look like in 300 years?"
            onSubmit={onSubmit}
            isLoading={isLoading}
            form={form}
          />
        </section>

        {/* Section: Conversation History */}
        <section className="space-y-4 mt-4">
          {/* No conversation history */}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}

          {/* Conversation history */}
          <div className="flex flex-col gap-y-4">
            {messages.map((message) => (
              <ChatBubble
                key={message.content}
                variant={message.role === "user" ? "user" : "bot"}
              >
                <p className="text-sm">{message.content}</p>
              </ChatBubble>
            ))}

            {/* Loading conversation */}
            {isLoading && (
              <div className="w-full">
                <Loader />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ConversationPage;
