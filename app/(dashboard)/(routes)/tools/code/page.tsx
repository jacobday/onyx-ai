"use client";

import axios from "axios";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import * as z from "zod";

import { ChatInput } from "@/components/ChatInput/chat-input";
import ChatBubble from "@/components/chat/ChatBubble/chat-bubble";
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import Loader from "@/components/chat/Loader/loader";

import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const CodePage = () => {
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

      const response = await axios.post("/api/code", {
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
    <main>
      {/* CodePage Heading */}
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="text-green-700/10"
      />

      {/* CodePage Content Container */}
      <div className="px-4 lg:px-8">
        {/* Section: Conversation Input */}
        <ChatInput
          placeholder="Simple toggle button using react hooks."
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />

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
                <ReactMarkdown
                  className="text-sm overflow-hidden leading-7"
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                >
                  {message.content || ""}
                </ReactMarkdown>
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
    </main>
  );
};

export default CodePage;
