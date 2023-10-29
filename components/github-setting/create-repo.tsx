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
import { repoInsertSchema, repoInsertType } from "@/lib/db/schema/repo";
import { ALL_REPO_KEY } from "@/components/nav/RepoSelector";
import { Card } from "@/components/ui/card";
import { createRepo } from "@/actions/github";

type Props = {};

function CreateRepo({}: Props) {
  const queryClient = useQueryClient();
  const form = useForm<repoInsertType>({
    resolver: zodResolver(repoInsertSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: repoInsertType) {
    try {
      const newRepo = await createRepo(values, true);
      const oldData = queryClient.getQueriesData(ALL_REPO_KEY);
      const oldRepos = oldData[0][1] as [];
      queryClient.setQueryData(ALL_REPO_KEY, [newRepo, ...oldRepos]);
      form.reset();
      toast({
        title: "Success",
        description: "Repository created successfully",
      });
    } catch (error) {
      console.log(error);
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
      <h3 className="text-xl mb-5 font-medium">Create new repository</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source Repository name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="CMD-data source"
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
            Create Repository
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default CreateRepo;
