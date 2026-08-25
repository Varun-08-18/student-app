import { Student, StudentInput } from "@/types/student";

const STORAGE_KEY = "student-management-students";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function readStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStudents(students: Student[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export const studentService = {
  async getStudents(): Promise<Student[]> {
    await delay();
    return readStudents();
  },

  async getStudentById(id: number): Promise<Student | undefined> {
    await delay();
    return readStudents().find((s) => s.id === id);
  },

  async createStudent(data: StudentInput): Promise<Student> {
    await delay();
    const students = readStudents();
    const newStudent: Student = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    students.push(newStudent);
    writeStudents(students);
    return newStudent;
  },

  async updateStudent(id: number, data: StudentInput): Promise<Student> {
    await delay();
    const students = readStudents();
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Student not found");
    students[index] = { ...students[index], ...data };
    writeStudents(students);
    return students[index];
  },

  async deleteStudent(id: number): Promise<void> {
    await delay();
    const students = readStudents().filter((s) => s.id !== id);
    writeStudents(students);
  },
};