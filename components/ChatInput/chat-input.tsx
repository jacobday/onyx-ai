import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import styles from "./chat-input.module.scss";

interface ChatInputProps {
  placeholder: string;
  onSubmit: any;
  isLoading: any;
  form: any;
  children?: React.ReactNode;
  options?: {
    inputClass: string;
  };
}

export const ChatInput = ({
  placeholder,
  onSubmit,
  isLoading,
  form,
  children,
  options,
}: ChatInputProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        {/* Prompt Input */}
        <FormField
          name="prompt"
          render={({ field }) => (
            // col-span-12 lg:col-span-10
            <FormItem
              className={options?.inputClass || "col-span-12 lg:col-span-10"}
            >
              <FormControl className="m-0 p-0">
                <Input
                  disabled={isLoading}
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Children */}
        {children}

        {/* Form Submit */}
        <Button
          className="col-span-12 lg:col-span-2 w-full"
          disabled={isLoading}
        >
          Send
        </Button>
      </form>
    </Form>
  );
};
