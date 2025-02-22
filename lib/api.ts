const API_URL = "http://127.0.0.1:4000"

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Login failed")
    }

    return response.json()
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function register(email: string, password: string, name: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
    credentials: "include", // This will include cookies
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  return response.json()
}

export async function getAIAnswers(question: string, token: string) {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question, type: "normal" }),
    credentials: "include", // This will include cookies
  })

  if (!response.ok) {
    throw new Error("Failed to get AI answers")
  }

  return response.json()
}

export async function humanizeAI(question: string, model: string, token: string) {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question, type: "Humanize AI", model }),
    credentials: "include", // This will include cookies
  })

  if (!response.ok) {
    throw new Error("Failed to humanize AI response")
  }

  return response.json()
}

