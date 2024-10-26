import React, { useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormField } from "../atoms/FormField";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import dayjs from "dayjs";
dayjs.extend(isSameOrAfter);
// TODO move to own file

const now = new Date();
const minTime = dayjs().add(1, "hour").toISOString();
const maxTime = dayjs().add(1, "year").toISOString();

const zodDayIsBefore = z.coerce
  .date({ message: "Please provide a date" })
  .refine((day) => dayjs(day).isSameOrAfter(now), {
    message: "Date cannot be in the past",
  });

const zodTimeIsBefore = z.coerce.string(); // TODO: this needs to be sorted

const schema = z.object({
  name: z
    .string({ message: "Your name is required" })
    .min(2, { message: "Please enter more letters" }),
  guests: z
    .number({ message: "Please provide a number of guests" })
    .min(1)
    .max(12, { message: "To book 12 guests or more, please contact support" }),
  email: z.string({ required_error: "please provide an email" }).email(),
  date: zodDayIsBefore,
  time: zodTimeIsBefore, // must be an hour in the future
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

  const submitForm: SubmitHandler<BookTableFormData> = async (data) => {
    setIsLoadingApiCall(true);
    setDisplaySuccessMessage(false);
    setDisplayErrorMessage(false);

    // TODO: saintise data here before we post it
    try {
      const response = await fetch("http://localhost:3001/bookings", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setDisplaySuccessMessage(true);
      }
    } catch (error) {
      console.log(error);
      setDisplayErrorMessage(true);
    } finally {
      setIsLoadingApiCall(false);
    }
  };

  function handleResetForm() {
    reset();
    setDisplaySuccessMessage(false);
  }

  return (
    <Container>
      <h2 className="text-lg font-bold">Book a Table</h2>

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

        {submitCount > 5 && (
          <p>
            You have reached max number of submissions, please come back again
            later
          </p>
        )}

        {displayErrorMessage && <p className="text-red-800">Booking failed</p>}

        {(isLoading || isLoadingApiCall) && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {displaySuccessMessage ? (
          <div data-testid="success-block">
            <p className="text-green-800 font-bold pb-4">
              Thank you for booking!
            </p>
            <p className=" pb-4">
              Your booking confirmation will be emailed to:{" "}
              <span className="font-bold">{getValues("email")}</span>
            </p>

            <Button
              disabled={displayErrorMessage || isLoading}
              data-testid="bookAnotherBtn"
              onClick={handleResetForm}
            >
              Book another?
            </Button>
          </div>
        ) : (
          <Button
            disabled={displayErrorMessage || isLoading}
            data-testid="submitBtn"
            onClick={handleSubmit((data) => submitForm(data))}
          >
            Book
          </Button>
        )}
      </form>
    </Container>
  );
};

export default BookTable;
