import { Student, StudentInput } from "../types/student";

const STORAGE_KEY = "students";

export async function getStudents(): Promise<Student[]> {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export async function getStudentById(
  id: number
): Promise<Student | undefined> {
  const students = await getStudents();

  return students.find((student) => student.id === id);
}

export async function createStudent(
  data: StudentInput
): Promise<Student> {
  const students = await getStudents();

  const newStudent: Student = {
    ...data,
    id: Date.now(),
  };

  const updatedStudents = [...students, newStudent];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedStudents)
  );

  return newStudent;
}

export async function updateStudent(
  id: number,
  data: StudentInput
): Promise<Student> {
  const students = await getStudents();

  const updatedStudent: Student = {
    ...data,
    id,
  };

  const updatedStudents = students.map((student) =>
    student.id === id ? updatedStudent : student
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedStudents)
  );

  return updatedStudent;
}

export async function deleteStudent(
  id: number
): Promise<void> {
  const students = await getStudents();

  const updatedStudents = students.filter(
    (student) => student.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedStudents)
  );
}