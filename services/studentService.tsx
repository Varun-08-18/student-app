import { Student, StudentInput } from "@/types/student";

const STORAGE_KEY = "student-management-students";

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function readStudents(): Student[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStudents(students: Student[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students)
  );
}

export const studentService = {
  async getStudents(): Promise<Student[]> {
    await delay();

    return readStudents();
  },

  async getStudentById(
    id: number
  ): Promise<Student | undefined> {
    await delay();

    const students = readStudents();

    return students.find(
      (student) => Number(student.id) === id
    );
  },

  async createStudent(
    data: StudentInput
  ): Promise<Student> {
    await delay();

    const students = readStudents();

    const newStudent: Student = {
      ...data,
      id: Date.now(),
    };

    students.push(newStudent);

    writeStudents(students);

    return newStudent;
  },

  async updateStudent(
    id: number,
    data: StudentInput
  ): Promise<Student> {
    await delay();

    const students = readStudents();

    const index = students.findIndex(
      (student) => Number(student.id) === id
    );

    if (index === -1) {
      throw new Error("Student not found");
    }

    const updatedStudent: Student = {
      ...students[index],
      ...data,
      id: students[index].id,
    };

    students[index] = updatedStudent;

    writeStudents(students);

    return updatedStudent;
  },

  async deleteStudent(id: number): Promise<void> {
    await delay();

    const students = readStudents().filter(
      (student) => Number(student.id) !== id
    );

    writeStudents(students);
  },
};