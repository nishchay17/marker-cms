"use client";
import * as z from "zod";

import FormBuilder, { FormBuilderProps } from "./ui/formBuilder";

export const userSigninSchema = z.object({
  email: z.string().email(),
  description: z.string().trim().min(6),
  priority: z.any(),
});

function FormExample() {
  const data: FormBuilderProps[] = [
    {
      label: "Email",
      name: "email",
      inputType: "input",
      defaultValue: "",
      inputProps: {},
    },
    {
      label: "Description",
      name: "description",
      inputType: "textarea",
      defaultValue: "",
      inputProps: {},
    },
    {
      label: "Priority",
      name: "priority",
      inputType: "select",
      defaultValue: {},
      inputProps: {},
      options: [
        {
          label: "High",
          value: "high",
        },
        {
          label: "Medium",
          value: "medium",
        },
        {
          label: "Low",
          value: "low",
        },
      ],
    },
  ];
  return (
    <div className="w-1/2 mx-auto my-40">
      <FormBuilder
        formId="some"
        formBuilderData={data}
        schema={userSigninSchema}
        onSubmit={async (data) => {
          console.log(data);
        }}
        isLoading={false}
      />
    </div>
  );
}

export default FormExample;
