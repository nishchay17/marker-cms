"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { createRepo } from "@/actions/github";
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
import { repoInsertSchema, repoInsertType } from "@/lib/db/schema/repo";
import { ALL_REPO_KEY } from "@/components/nav/RepoSelector";

function Github() {
  const queryClient = useQueryClient();
  const form = useForm<repoInsertType>({
    resolver: zodResolver(repoInsertSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: repoInsertType) {
    try {
      const newRepo = await createRepo(values);
      const oldData = queryClient.getQueriesData(ALL_REPO_KEY);
      const oldRepos = oldData[0][1] as [];
      queryClient.setQueryData(ALL_REPO_KEY, [newRepo, ...oldRepos]);
      form.reset();
      toast({
        title: "Success",
        description: "repo created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      Github
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Repository's name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Github;
