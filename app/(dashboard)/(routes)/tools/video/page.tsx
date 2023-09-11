"use client";

import axios from "axios";
import { VideoIcon } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import ChatBubble from "@/components/chat/ChatBubble/chat-bubble";

const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);
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
      {/* VideoPage Heading */}
      <Heading
        title="Video Generation"
        description="Turn your prompt into a video."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="text-orange-700/10"
      />

      {/* VideoPage Content Container */}
      <div className="px-4 lg:px-8">
        {/* Section: Prompt Input */}
        <ChatInput
          placeholder="Clown fish swimming around a coral reef"
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />

        {/* Section: Generated Video */}
        <section className="space-y-4 mt-4">
          {/* No video generated */}
          {!video && !isLoading && <Empty label="No video generated." />}

          {/* Generated Video Player */}
          {video && (
            <ChatBubble variant={"bot"}>
              <video
                className="w-full aspect-video rounded-lg border bg-black"
                controls
              >
                <source src={video} />
              </video>
            </ChatBubble>
          )}

          {/* Loading video */}
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

export default VideoPage;
