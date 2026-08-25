"use client";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Student,
  StudentInput,
} from "@/types/student";

import { studentService } from "@/services/studentService";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const id = Number(params.id);

        if (Number.isNaN(id)) {
          setStudent(null);
          return;
        }

        const data =
          await studentService.getStudentById(id);

        if (data) {
          setStudent(data);
        }
      } catch (error) {
        console.error(
          "Error fetching student:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return (
      <div>
        <h1>Student not found</h1>

        <button
          onClick={() => router.push("/students")}
        >
          Back to Students
        </button>
      </div>
    );
  }

  const initialValues: StudentInput = {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phone: student.phone,
    dateOfBirth: student.dateOfBirth,
    course: student.course,
    batch: student.batch,
    startDate: student.startDate,
    trainer: student.trainer,
    experience: student.experience,
    status: student.status,
    score: student.score,
    pendingAssignments: student.pendingAssignments,
  };

  const handleSubmit = async (
    values: StudentInput,
    {
      setSubmitting,
    }: {
      setSubmitting: (value: boolean) => void;
    }
  ) => {
    try {
      console.log("Updating student:", values);

      await studentService.updateStudent(
        student.id,
        values
      );

      console.log("Student updated successfully");

      router.push("/students");
    } catch (error) {
      console.error(
        "Error updating student:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>

            {/* First Name */}
            <div>
              <label htmlFor="firstName">
                First Name
              </label>

              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
              />

              <ErrorMessage
                name="firstName"
                component="div"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName">
                Last Name
              </label>

              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter last name"
              />

              <ErrorMessage
                name="lastName"
                component="div"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">
                Email
              </label>

              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
              />

              <ErrorMessage
                name="email"
                component="div"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone">
                Phone
              </label>

              <Field
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter phone"
              />

              <ErrorMessage
                name="phone"
                component="div"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth">
                Date of Birth
              </label>

              <Field
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
              />

              <ErrorMessage
                name="dateOfBirth"
                component="div"
              />
            </div>

            {/* Course */}
            <div>
              <label htmlFor="course">
                Course
              </label>

              <Field
                id="course"
                name="course"
                type="text"
                placeholder="Enter course"
              />

              <ErrorMessage
                name="course"
                component="div"
              />
            </div>

            {/* Batch */}
            <div>
              <label htmlFor="batch">
                Batch
              </label>

              <Field
                id="batch"
                name="batch"
                type="text"
                placeholder="Enter batch"
              />

              <ErrorMessage
                name="batch"
                component="div"
              />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate">
                Start Date
              </label>

              <Field
                id="startDate"
                name="startDate"
                type="date"
              />

              <ErrorMessage
                name="startDate"
                component="div"
              />
            </div>

            {/* Trainer */}
            <div>
              <label htmlFor="trainer">
                Trainer
              </label>

              <Field
                id="trainer"
                name="trainer"
                type="text"
                placeholder="Enter trainer"
              />

              <ErrorMessage
                name="trainer"
                component="div"
              />
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience">
                Experience
              </label>

              <Field
                id="experience"
                name="experience"
                type="text"
                placeholder="Enter experience"
              />

              <ErrorMessage
                name="experience"
                component="div"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status">
                Status
              </label>

              <Field
                as="select"
                id="status"
                name="status"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </Field>

              <ErrorMessage
                name="status"
                component="div"
              />
            </div>

            {/* Score */}
            <div>
              <label htmlFor="score">
                Score
              </label>

              <Field
                id="score"
                name="score"
                type="number"
                min="0"
              />

              <ErrorMessage
                name="score"
                component="div"
              />
            </div>

            {/* Pending Assignments */}
            <div>
              <label htmlFor="pendingAssignments">
                Pending Assignments
              </label>

              <Field
                id="pendingAssignments"
                name="pendingAssignments"
                type="number"
                min="0"
              />

              <ErrorMessage
                name="pendingAssignments"
                component="div"
              />
            </div>

            {/* Buttons */}
            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Updating..."
                : "Update Student"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.push("/students")
              }
            >
              Cancel
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}