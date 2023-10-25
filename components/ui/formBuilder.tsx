"use client";

import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "./form";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";
import Select from "./Select";

type ObjectStr = {
  [index: string]: any;
};
export type FormType = "input" | "select" | "textarea";
export type FormBuilderProps = {
  name: string;
  inputType: FormType;
  label: string;
  placeholder?: string;
  defaultValue?: string | ObjectStr;
  value?: string;
  inputProps?:
    | InputHTMLAttributes<HTMLInputElement>
    | SelectHTMLAttributes<HTMLSelectElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>;
  options?: { value: string; label: string }[];
};
type Props = {
  schema: any;
  formId: string;
  onSubmit: (data: unknown) => Promise<void>;
  isLoading: boolean;
  formBuilderData: FormBuilderProps[];
  formClassName?: string;
  btnText?: string;
  btnClassName?: string;
  btnProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  formProps?: FormHTMLAttributes<HTMLFormElement>;
  btnVisible?: boolean;
};

function validationCheck(schema: any, formData: FormBuilderProps[]) {
  const keysInSchema = Object.keys(schema.shape);
  const elementNotInSchema =
    formData.filter((it) => !keysInSchema.includes(it.name)).length !== 0;
  if (!!elementNotInSchema) {
    throw new Error("Not all form-builder data are in Schema");
  }
}

function FormBuilder({
  onSubmit,
  isLoading,
  schema,
  formBuilderData,
  formId,
  formClassName,
  btnText,
  btnClassName,
  btnProps,
  formProps,
  btnVisible = true,
}: Props) {
  validationCheck(schema, formBuilderData);
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: formBuilderData.reduce(
      (o: ObjectStr, i: FormBuilderProps) => ({
        ...o,
        [i.name]: i.defaultValue,
      }),
      {}
    ),
    resolver: zodResolver(schema),
  });
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid gap-4", formClassName)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...formProps}
      >
        {formBuilderData.map((formData) => {
          switch (formData.inputType) {
            case "input":
              return (
                <FormField
                  key={formData.name}
                  control={form.control}
                  name={formData.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formData.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={formData.placeholder}
                          {...(formData.inputProps as InputHTMLAttributes<HTMLInputElement>)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            case "textarea":
              return (
                <FormField
                  key={formData.name}
                  control={form.control}
                  name={formData.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formData.label}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={formData.placeholder}
                          {...(formData.inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            case "select":
              return (
                <FormField
                  key={formData.name}
                  control={form.control}
                  name={formData.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formData.label}</FormLabel>
                      <FormControl>
                        <Select
                          placeholder={formData.placeholder}
                          {...field}
                          options={formData.options}
                          {...(formData.inputProps as
                            | SelectHTMLAttributes<HTMLSelectElement>
                            | any)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            default:
              break;
          }
        })}
        {btnVisible && (
          <Button
            type="submit"
            form={formId}
            isLoading={isLoading}
            {...btnProps}
            className={cn("w-full mt-2", btnClassName)}
          >
            {!!btnText?.trim() ? btnText.trim() : "Submit"}
          </Button>
        )}
      </form>
    </Form>
  );
}

export default FormBuilder;
