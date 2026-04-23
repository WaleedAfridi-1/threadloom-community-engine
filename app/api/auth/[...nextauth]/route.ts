// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth" // Ensure your @ alias points to root correctly

export const { GET, POST } = handlers