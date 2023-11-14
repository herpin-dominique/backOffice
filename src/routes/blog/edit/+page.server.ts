import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import { BlogSchema } from "$lib/server/blogs";
import { fail } from "@sveltejs/kit";
import { saveBlog } from "$lib/server/blogs";

export const load = async () => {
  // Server API:
  const form = await superValidate(BlogSchema);

  // Unless you throw, always return { form } in load and form actions.
  return { form };
};

export const actions = {
  abandonner: async ({ request }) => {
    const formData = await request.formData();
    const articleId = formData.get("id");

    console.log(`abandonner l'article ${articleId}`);
  },
  publier: async ({ request }) => {
    const form = await superValidate(request, BlogSchema);

    // Convenient validation check:
    if (!form.valid) {
      // Handle validation errors
      console.error(form);
      return fail(400, { form });
    }

    // Do something with the validated form.data
    saveBlog(form.data);

    // Additional logic for publishing...
    console.log("Publication réussie");

    // Return { form } here if needed
    return { form };
  },
  sauvegarder: async ({ request }) => {
    const form = await superValidate(request, BlogSchema);

    // Convenient validation check:
    if (!form.valid) {
      // Handle validation errors
      console.error(form);
      return fail(400, { form });
    }

    // Do something with the validated form.data
    saveBlog(form.data);

    // Yep, return { form } here too
    return { form };
  },
};
