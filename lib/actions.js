"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function validateFields(text) {
  return !text || text.trim() === "";
}

export async function handleForm(prevState, formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  if (
    validateFields(meal.creator) ||
    validateFields(meal.creator_email) ||
    validateFields(meal.title) ||
    validateFields(meal.summary) ||
    validateFields(meal.instructions) ||
    validateFields(meal.image)
  ) {
    return {
      ...prevState,
      error: "Please fill out all fields",
    };
  }
    await saveMeal(meal);
  redirect("/meals");
}
