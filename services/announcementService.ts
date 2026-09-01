export interface Announcement {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "student-management-announcements";

function read(): Announcement[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(data: Announcement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const announcementService = {
  async getAll(): Promise<Announcement[]> {
    return read().sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  async create(title: string, message: string): Promise<Announcement> {
    const list = read();
    const newItem: Announcement = {
      id: Date.now(),
      title,
      message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newItem);
    write(list);
    return newItem;
  },

  async update(id: number, title: string, message: string): Promise<Announcement> {
    const list = read();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Announcement not found");

    list[index] = {
      ...list[index],
      title,
      message,
      updatedAt: new Date().toISOString(),
    };
    write(list);
    return list[index];
  },

  async delete(id: number): Promise<void> {
    write(read().filter((a) => a.id !== id));
  },
};