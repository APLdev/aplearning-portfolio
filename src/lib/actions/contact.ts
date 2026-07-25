"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set");
    return { status: "error" };
  }

  const payload = {
    access_key: accessKey,
    subject: "Nueva solicitud desde APLearning",
    from_name: formData.get("name"),
    name: formData.get("name"),
    company: formData.get("company") || "—",
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return { status: result.success ? "success" : "error" };
  } catch (error) {
    console.error("Web3Forms submission failed", error);
    return { status: "error" };
  }
}
