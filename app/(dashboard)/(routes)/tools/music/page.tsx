"use client";

import axios from "axios";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import Loader from "@/components/chat/Loader/loader";
import { ChatInput } from "@/components/ChatInput/chat-input";
import ChatBubble from "@/components/chat/ChatBubble/chat-bubble";

import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);
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
      {/* MusicPage Heading */}
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="text-emerald-500/10"
      />

      {/* MusicPage Content Container */}
      <div className="px-4 lg:px-8">
        {/* Section: Prompt Input */}
        <ChatInput
          placeholder="Piano solo in C major"
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />

        {/* Section: Generated Music */}
        <section className="space-y-4 mt-4">
          {/* No music generated */}
          {!music && !isLoading && <Empty label="No music generated." />}

          {/* Generated Music Player */}
          {music && (
            <ChatBubble variant={"bot"}>
              <audio controls className="w-full">
                <source src={music} />
              </audio>
            </ChatBubble>
          )}

          {/* Loading music */}
          {isLoading && (
            <div className="w-full">
              <Loader />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MusicPage;
