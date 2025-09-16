import React from "react";
import { Box, MenuItem, TextField, Chip, Autocomplete } from "@mui/material";
import { useForm } from "react-hook-form";
import { Ticket, Priority, Tag } from "../types/ticket";
import { AppInput } from "../components/AppInput";
import axiosInstance from "../utils/axiosInstance";
import { SubmitButton } from "../components/SubmitButton";
import { useToast } from "../context/ToastContext";
import TitleSection from "../components/TitleSection";

const priorities: Priority[] = ["low", "medium", "high"];
const availableTags: Tag[] = [
  "auth",
  "urgent",
  "billing",
  "payment",
  "feature",
  "ui",
  "bug",
  "frontend",
];

type TicketFormValues = {
  subject: string;
  description: string;
  priority: Priority;
  tags: Tag[];
};

export const TicketCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TicketFormValues>({
    defaultValues: {
      subject: "",
      description: "",
      priority: "low",
      tags: [],
    },
  });

  const { showToast } = useToast();

  const onSubmit = async (values: TicketFormValues) => {
    const newTicket: Ticket = {
      id: String(Date.now()),
      subject: values.subject,
      description: values.description,
      status: "open",
      priority: values.priority,
      assignee: undefined,
      tags: values.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await axiosInstance.post<Ticket>("/tickets", newTicket);
      showToast({ message: "Ticket created!", severity: "success" });
      console.log("Ticket created:", response.data);
      reset();
    } catch (error: any) {
      showToast({ message: "Something went wrong!", severity: "error" });
      console.error("Failed to create ticket:", error);
    }
  };

  return (
    <>
      <TitleSection />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <AppInput
          label="Subject"
          {...register("subject", { required: "Subject is required" })}
          error={!!errors.subject}
          helperText={errors.subject?.message}
        />

        <AppInput
          label="Description"
          multiline
          minRows={3}
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <AppInput select label="Priority" {...register("priority")}>
          {priorities.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </AppInput>

        <Autocomplete
          multiple
          options={availableTags}
          value={watch("tags")}
          style={{ width: "100%" }}
          onChange={(_, newValue) => setValue("tags", newValue)}
          renderTags={(value: Tag[], getTagProps) =>
            value.map((option: Tag, index: number) => (
              <Chip label={option} {...getTagProps({ index })} key={option} />
            ))
          }
          renderInput={(params) => <TextField {...params} label="Tags" />}
        />

        <SubmitButton type="submit" variant="contained" label={"Create Ticket"} />
      </Box>
    </>
  );
};
