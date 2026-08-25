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

const steps = [
  "Personal Information",
  "Course Information",
  "Confirmation",
];

const validationSchemas = [
  Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
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
      return;
    }

    setActiveStep(activeStep + 1);
  };

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

        {/* STEP 1 */}
        {activeStep === 0 && (
          <Box>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              margin="normal"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              margin="normal"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              margin="normal"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              margin="normal"
        
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
            />
          </Box>
        )}

        {/* STEP 2 */}
        {activeStep === 1 && (
          <Box>
            <TextField
              select
              fullWidth
              label="Course"
              name="course"
              margin="normal"
              value={formik.values.course}
              onChange={formik.handleChange}
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Next.js">Next.js</MenuItem>
              <MenuItem value="Angular">Angular</MenuItem>
              <MenuItem value="Node.js">Node.js</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Batch"
              name="batch"
              margin="normal"
              value={formik.values.batch}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              margin="normal"
              
              value={formik.values.startDate}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              label="Trainer"
              name="trainer"
              margin="normal"
              value={formik.values.trainer}
              onChange={formik.handleChange}
            />

            <TextField
              select
              fullWidth
              label="Experience"
              name="experience"
              margin="normal"
              value={formik.values.experience}
              onChange={formik.handleChange}
            >
              <MenuItem value="Fresher">Fresher</MenuItem>
              <MenuItem value="1 Year">1 Year</MenuItem>
              <MenuItem value="2 Years">2 Years</MenuItem>
              <MenuItem value="3+ Years">3+ Years</MenuItem>
            </TextField>
          </Box>
        )}

        {/* STEP 3 */}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Confirm Student Details
            </Typography>

            <Typography>
              Name: {formik.values.firstName} {formik.values.lastName}
            </Typography>

            <Typography>
              Email: {formik.values.email}
            </Typography>

            <Typography>
              Phone: {formik.values.phone}
            </Typography>

            <Typography>
              Course: {formik.values.course}
            </Typography>

            <Typography>
              Batch: {formik.values.batch}
            </Typography>

            <Typography>
              Start Date: {formik.values.startDate}
            </Typography>

            <Typography>
              Trainer: {formik.values.trainer}
            </Typography>

            <Typography>
              Experience: {formik.values.experience}
            </Typography>
          </Box>
        )}

        {/* BUTTONS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Button
            type="button"
            disabled={activeStep === 0}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Back
          </Button>

          {activeStep < 2 ? (
            <Button
              type="button"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              {isEdit ? "Update Student" : "Submit"}
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}
