import React from "react";
import { Box, MenuItem, Autocomplete, Chip, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Ticket, Priority, Tag } from "../types/ticket";
import { AppInput } from "../components/AppInput";
import { SubmitButton } from "../components/SubmitButton";
import axiosInstance from "../utils/axiosInstance";
import { useToast } from "../context/ToastContext";

type TicketDetailProps = {
  ticket: Ticket;
};

type TicketDetailFormValues = {
  subject: string;
  description: string;
  priority: Priority;
  tags: Tag[];
};

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

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticket }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TicketDetailFormValues>({
    defaultValues: {
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      tags: ticket.tags,
    },
  });
  const { showToast } = useToast();

  const onSubmit = async (values: TicketDetailFormValues) => {
    try {
      const updates: Partial<Ticket> = { ...values };

      const response = await axiosInstance.put<Ticket>(
        `/tickets/${ticket.id}`,
        updates
      );
      showToast({ message: "Ticket created!", severity: "success" });
      console.log("Ticket updated:", response.data);
    } catch (err: any) {
      showToast({ message: "Something went wrong!", severity: "error" });
    }
  };

  return (
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
        p: 2,
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

      <AppInput
        select
        label="Priority"
        {...register("priority")}
        defaultValue={ticket.priority}
      >
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

      <SubmitButton type="submit" variant="contained" label="Save Changes" />
    </Box>
  );
};
