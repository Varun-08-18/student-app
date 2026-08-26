"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Typography,
} from "@mui/material";

import { StudentInput } from "@/types/student";
import { COURSE_OPTIONS, EXPERIENCE_OPTIONS } from "@/app/library/constants";

const steps = ["Personal Information", "Course Information", "Confirmation"];

const DEFAULT_VALUES: StudentInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  course: "",
  batch: "",
  startDate: "",
  trainer: "",
  experience: "",
  status: "Active",
  score: 0,
  pendingAssignments: 0,
};

function buildValidationSchemas(existingEmails: string[]) {
  return [
    Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
        .test(
          "unique-email",
          "A student with this email already exists",
          (value) => !value || !existingEmails.includes(value.toLowerCase())
        ),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      dateOfBirth: Yup.string().required("Date of Birth is required"),
    }),
    Yup.object({
      course: Yup.string().required("Course is required"),
      batch: Yup.string().required("Batch is required"),
      startDate: Yup.string().required("Start Date is required"),
      trainer: Yup.string().required("Trainer is required"),
      experience: Yup.string().required("Experience is required"),
    }),
    Yup.object({}),
  ];
}

interface StudentFormProps {
  initialValues?: StudentInput;
  existingEmails?: string[];
  onSubmit: (values: StudentInput) => void;
  isEdit?: boolean;
}

export default function StudentForm({
  initialValues,
  existingEmails = [],
  onSubmit,
  isEdit = false,
}: StudentFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const validationSchemas = buildValidationSchemas(existingEmails);

  const formik = useFormik({
    initialValues: initialValues || DEFAULT_VALUES,
    enableReinitialize: true,
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        onSubmit(values);
      }
    },
  });

  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const fieldProps = (name: keyof StudentInput) => ({
    name,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: Boolean(formik.touched[name] && formik.errors[name]),
    helperText: formik.touched[name] ? (formik.errors[name] as string) : undefined,
  });

  return (
    <Box sx={{ maxWidth: 700, margin: "30px auto" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={formik.handleSubmit}>
        {activeStep === 0 && (
          <Box>
            <TextField fullWidth label="First Name" margin="normal" {...fieldProps("firstName")} />
            <TextField fullWidth label="Last Name" margin="normal" {...fieldProps("lastName")} />
            <TextField fullWidth label="Email" margin="normal" {...fieldProps("email")} />
            <TextField fullWidth label="Phone" margin="normal" {...fieldProps("phone")} />
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              margin="normal"
              slotProps={{ inputLabel: { shrink: true } }}
              {...fieldProps("dateOfBirth")}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <TextField select fullWidth label="Course" margin="normal" {...fieldProps("course")}>
              {COURSE_OPTIONS.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth label="Batch" margin="normal" {...fieldProps("batch")} />
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              margin="normal"
              slotProps={{ inputLabel: { shrink: true } }}
              {...fieldProps("startDate")}
            />
            <TextField fullWidth label="Trainer" margin="normal" {...fieldProps("trainer")} />
            <TextField select fullWidth label="Experience" margin="normal" {...fieldProps("experience")}>
              {EXPERIENCE_OPTIONS.map((exp) => (
                <MenuItem key={exp} value={exp}>
                  {exp}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Confirm Student Details</Typography>
            <Typography>Name: {formik.values.firstName} {formik.values.lastName}</Typography>
            <Typography>Email: {formik.values.email}</Typography>
            <Typography>Phone: {formik.values.phone}</Typography>
            <Typography>Course: {formik.values.course}</Typography>
            <Typography>Batch: {formik.values.batch}</Typography>
            <Typography>Start Date: {formik.values.startDate}</Typography>
            <Typography>Trainer: {formik.values.trainer}</Typography>
            <Typography>Experience: {formik.values.experience}</Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button type="button" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
            Back
          </Button>
          {activeStep < 2 ? (
            <Button type="button" variant="contained" onClick={handleNext}>Next</Button>
          ) : (
            <Button type="submit" variant="contained">{isEdit ? "Update Student" : "Submit"}</Button>
          )}
        </Box>
      </form>
    </Box>
  );
}