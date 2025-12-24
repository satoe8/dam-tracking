import AsyncStorage from "@react-native-async-storage/async-storage"

export interface Habit {
  id: string
  name: string
  description: string
  frequency: "daily" | "weekly" | "multiple"
  timesPerDay?: number
  completedToday: number
  lastCompleted?: string
}

export interface Friend {
  id: string
  username: string
  energy: number
  mood: string
}

export const storage = {
  async getHabits(): Promise<Habit[]> {
    try {
      const data = await AsyncStorage.getItem("habits")
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Error getting habits:", error)
      return []
    }
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await AsyncStorage.setItem("habits", JSON.stringify(habits))
    } catch (error) {
      console.error("Error saving habits:", error)
    }
  },

  async getFriends(): Promise<Friend[]> {
    try {
      const data = await AsyncStorage.getItem("friends")
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Error getting friends:", error)
      return []
    }
  },

  async saveFriends(friends: Friend[]): Promise<void> {
    try {
      await AsyncStorage.setItem("friends", JSON.stringify(friends))
    } catch (error) {
      console.error("Error saving friends:", error)
    }
  },

  async getBeaverEnergy(): Promise<number> {
    try {
      const data = await AsyncStorage.getItem("beaverEnergy")
      return data ? Number.parseInt(data) : 50
    } catch (error) {
      console.error("Error getting beaver energy:", error)
      return 50
    }
  },

  async setBeaverEnergy(energy: number): Promise<void> {
    try {
      await AsyncStorage.setItem("beaverEnergy", energy.toString())
    } catch (error) {
      console.error("Error saving beaver energy:", error)
    }
  },

  async getHabitLogs(): Promise<Record<string, string[]>> {
    try {
      const data = await AsyncStorage.getItem("habitLogs")
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error("Error getting habit logs:", error)
      return {}
    }
  },

  async saveHabitLogs(logs: Record<string, string[]>): Promise<void> {
    try {
      await AsyncStorage.setItem("habitLogs", JSON.stringify(logs))
    } catch (error) {
      console.error("Error saving habit logs:", error)
    }
  },
}
