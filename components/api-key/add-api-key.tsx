"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { apiKeyInsertSchema, apiKeyInsertType } from "@/lib/db/schema/api-key";
import { createApiKey } from "@/actions/api-key";

export const ALL_API_KEY = "all-api-key";

function CreateApiKey() {
  const queryClient = useQueryClient();
  const form = useForm<apiKeyInsertType>({
    resolver: zodResolver(apiKeyInsertSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: apiKeyInsertType) {
    try {
      const newApiKey = await createApiKey(values.name);
      //   const oldData = queryClient.getQueriesData(ALL_API_KEY);
      //   const oldRepos = oldData[0][1] as [];
      //   queryClient.setQueryData(ALL_REPO_KEY, [newRepo, ...oldRepos]);
      form.reset();
      toast({
        title: "Success",
        description: "API key created successfully",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again later";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  }
  return (
    <Card className="p-5">
      <h3 className="text-xl mb-5 font-medium">Create new API key</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API key name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="primary key"
                    className="max-w-[30rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            className="mt-4"
            isLoading={form.formState.isSubmitting}
          >
            Create API key
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default CreateApiKey;
