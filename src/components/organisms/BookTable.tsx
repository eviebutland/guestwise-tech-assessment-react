import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormField } from "../atoms/FormField";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import dayjs from "dayjs";
dayjs.extend(isSameOrAfter);
// TODO move to own file

const now = new Date();
const minTime = dayjs().add(1, "hour").toISOString(); // not actually working
const maxTime = dayjs().add(1, "year").toISOString(); // not actually working

const zodDayIsBefore = z.coerce
  .date({ message: "Please provide a date" })
  .refine((day) => dayjs(day).isSameOrAfter(now), {
    message: "Date cannot be in the past",
  });

const schema = z.object({
  firstName: z
    .string({ message: "Your name is required" })
    .min(2, { message: "Please enter more letters" }),
  numberOfPeople: z.number().min(1).max(12, { message: "Contact support" }),
  email: z.string({ required_error: "please provide an email" }).email(),
  dayOfBooking: zodDayIsBefore,
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(15, { message: "Please enter a valid phone number" }), // would use a different validation as this is not very strong
});

interface BookTableFormData {
  name: string;
  phone: string;
  email: string;
  time: string;
  guests: number;
  date: string;
}

const BookTable: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount, isLoading, isValid, isDirty },
    getValues,
    reset,
  } = useForm<BookTableFormData>({
    resolver: zodResolver(schema),
  });

  const [isLoadingApiCall, setIsLoadingApiCall] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const submitForm = async (event: React.FormEvent) => {
    // event.preventDefault();
    // try {
    //   const response = await fetch("http://localhost:3001/bookings", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({}),
    //   });
    //   if (!response.ok) throw new Error("Booking failed");
    //   console.log("Booking successful");
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   console.log("Completed request");
    // }
  };

  return (
    <Container>
      <h2 className="text-lg font-bold">Book a Table</h2>
      {/* onSubmit={handleSubmit(submitForm)} */}
      <form>
        <FormField name="name" label="Your name" errors={errors?.name}>
          <input
            data-testid="name"
            {...register("name")}
            type="text"
            className="border rounded p-2"
            aria-invalid={errors.name ? "true" : "false"}
          />
        </FormField>
        <FormField name="email" errors={errors.email} label="Your email">
          <input
            data-testid="email"
            {...register("email")}
            type="email"
            className="border rounded p-2"
            aria-invalid={errors.email ? "true" : "false"}
          />
        </FormField>
        <FormField
          name="phone"
          label="Your phone number"
          errors={errors?.phone}
        >
          <input
            data-testid="phone"
            {...register("phone")}
            placeholder="07720765444"
            type="phone"
            className="border rounded p-2"
            aria-invalid={errors.phone ? "true" : "false"}
          />
        </FormField>
        <br />
        <FormField label="Reservation date" name="date" errors={errors.date}>
          <input
            className="border rounded p-2"
            min={minTime}
            max={maxTime}
            data-testid="date"
            {...register("date", { valueAsDate: true })}
            type="date"
            aria-invalid={errors.email ? "true" : "false"}
          />
        </FormField>
        <FormField label="Reservation time" name="time" errors={errors.time}>
          <input
            className="border rounded p-2"
            min={minTime}
            max={maxTime}
            data-testid="time"
            {...register("time", { valueAsDate: true })}
            type="time"
            aria-invalid={errors.email ? "true" : "false"}
          />
        </FormField>
        <FormField
          name="guests"
          label="Number of guests"
          errors={errors.guests}
        >
          <input
            className="border rounded p-2"
            {...register("guests", {
              setValueAs: (v) => parseInt(v),
            })}
            data-testid="guests"
            type="number"
            aria-invalid={errors.guests ? "true" : "false"}
          />
        </FormField>
        <button type="submit">Book</button>
      </form>
    </Container>
  );
};

export default BookTable;
