"use client";

import axios from "axios";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/chat/empty";
import Loader from "@/components/chat/Loader/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Card, CardFooter } from "@/components/ui/card";
import { ChatInput } from "@/components/ChatInput/chat-input";

import { useProModal } from "@/hooks/use-pro-modal";

import { amountOptions, formSchema, resolutionOptions } from "./constants";

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

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
      {/* ImagePage Heading */}
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="text-pink-700/10"
      />

      {/* ImagePage Content Container */}
      <ChatInput
        placeholder="A picture of a horse in the Swiss alps"
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        options={{ inputClass: "col-span-12 lg:col-span-6" }}
      >
        {/* Amount Input */}
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-2">
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  {/* Selected Amount */}
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>

                {/* Dropdown Options */}
                <SelectContent>
                  {amountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Resolution Input */}
        <FormField
          name="resolution"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-2">
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  {/* Selected Amount */}
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>

                {/* Dropdown Options */}
                <SelectContent>
                  {resolutionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </ChatInput>

      <div className="px-4 lg:px-8">
        {/* Section: Rendered Images */}
        <section className="space-y-4 mt-4">
          {/* No image history */}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}

          {/* Rendered Images Container  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-square">
                  <Image alt="Image" fill src={src} />
                </div>

                {/* Image Download Button */}
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    variant="secondary"
                    className="w-full "
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Loading images */}
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

export default ImagePage;
