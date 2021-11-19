import { useAsyncStorage } from "@react-native-async-storage/async-storage"

const { getItem, setItem } = useAsyncStorage("@username")

export const loadUsername = async () => {
  const username = await getItem()
  if (username) {
    const studentUsername = username.split(",")[0]
    const tutorUsername = username.split(",")[1]
    return [studentUsername, tutorUsername]
  }
  return ["", ""]
}

export const saveUsername = async (
  studentUsername: string,
  tutorUsername: string
) => {
  // save string => "{studentUsername},{tutorUsername}" to storage //
  await setItem(`${studentUsername},${tutorUsername}`)
}
