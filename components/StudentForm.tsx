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

const steps = ["Personal Information", "Course Information", "Confirmation"];

const validationSchemas = [
  // Step 1
  Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
  }),
  // Step 2
  Yup.object({
    course: Yup.string().required("Course is required"),
    batch: Yup.string().required("Batch is required"),
    startDate: Yup.string().required("Start Date is required"),
    trainer: Yup.string().required("Trainer is required"),
    experience: Yup.string().required("Experience is required"),
  }),
  // Step 3
  Yup.object({}),
];

interface StudentFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  isEdit?: boolean;
}

export default function StudentForm({
  initialValues,
  onSubmit,
  isEdit = false,
}: StudentFormProps) {
  const [activeStep, setActiveStep] = useState(0);
const formik = useFormik({
  initialValues: initialValues || {
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
  },
  validationSchema: validationSchemas[activeStep],
  enableReinitialize: true,
  onSubmit: (values: any) => {          // ← yahan type de diya
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      onSubmit(values);
    }
  },
});
}