"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set");
    return {
      status: "error",
      message: "La configuración de envío no está disponible. Intenta nuevamente en unos minutos.",
    };
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

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
      body?: { message?: string };
    };

    if (response.ok && result.success) {
      return { status: "success" };
    }

    console.error("Web3Forms rejected submission", { status: response.status, result });
    return {
      status: "error",
      message:
        result.message ??
        result.body?.message ??
        "El servicio de envío rechazó la solicitud. Intenta nuevamente.",
    };
  } catch (error) {
    console.error("Web3Forms submission failed", error);
    return {
      status: "error",
      message: "No se pudo conectar con el servicio de envío. Intenta nuevamente.",
    };
  }
}
