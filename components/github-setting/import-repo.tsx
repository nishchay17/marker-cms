"use client";

import { useQuery, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createRepo, getAllRepoFromGithub } from "@/actions/github";
import { Card } from "../ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ALL_REPO_KEY } from "../nav/RepoSelector";
import { toast } from "../ui/use-toast";
import Select from "../ui/Select";

const importSchema = z.object({
  name: z.object({ value: z.string(), label: z.string() }),
});
type importType = z.infer<typeof importSchema>;

function ImportRepo() {
  const queryClient = useQueryClient();

  const data = useQuery({
    queryFn: getAllRepoFromGithub,
    queryKey: "all-repo-from-github",
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<importType>({
    resolver: zodResolver(importSchema),
  });

  async function onSubmit(values: importType) {
    try {
      const newRepo = await createRepo({ name: values.name.value });
      const oldData = queryClient.getQueriesData(ALL_REPO_KEY);
      const oldRepos = oldData[0][1] as [];
      queryClient.setQueryData(ALL_REPO_KEY, [newRepo, ...oldRepos]);
      form.reset();
      toast({
        title: "Success",
        description: "Repository imported successfully",
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
      <h3 className="text-xl mb-5 font-medium">Import repository</h3>
      {data.isError ? (
        <p>Error while fetching Repository</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Repository name</FormLabel>
                  <FormControl>
                    <Select
                      isLoading={data.isLoading}
                      options={data.data?.map((repo: string) => ({
                        label: repo,
                        value: repo,
                      }))}
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
              Import Repository
            </Button>
          </form>
        </Form>
      )}
    </Card>
  );
}

export default ImportRepo;
