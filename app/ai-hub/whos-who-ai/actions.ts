import { createAction } from "redux-actions"

// Action Types
export const SEND_EMAIL = "SEND_EMAIL"

// Action Creators
export const sendEmail = (emailData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/send-whos-who-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      const data = await response.json()
      dispatch(createAction(SEND_EMAIL)(data))
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }
}
